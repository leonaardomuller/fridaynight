import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  useWindowDimensions,
} from "react-native";
import { HStack, View } from "native-base";
import MapView, { Marker, Circle } from "react-native-maps";
import { CustomMarker } from "./components/CustomMarker";
import Geolocation from "react-native-geolocation-service";
import { ButtonGoBack } from "../../components/ButtonGoBack";
import { SearchInput } from "./components/SearchInput";
import { Card } from "./components/Carousel/components/Card";
import Carousel from "react-native-snap-carousel";

export function Map() {
  const carouselRef = useRef(null);
  const { width } = useWindowDimensions();

  const [initialRegion, setInitialRegion] = useState(null);
  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const setLocationData = (latitude, longitude) => {
    const dif = 0.003;
    setMarkers([
      createMarker("Event 1", latitude + dif, longitude + dif),
      createMarker("Event 2", latitude - dif, longitude - dif),
      createMarker("Event 3", latitude + dif, longitude + dif * 7),
      createMarker("Event 4", latitude - dif, longitude - dif * 7),
      createMarker("Event 5", latitude + dif, longitude + dif * 10),
      createMarker("Event 6", latitude - dif, longitude - dif * 10),
    ]);
    setInitialRegion(createRegion(latitude, longitude));
    setRegion({ ...region, latitude, longitude });
    setLocation({ latitude, longitude });
  };

  const createMarker = (name, latitude, longitude) => ({
    name,
    location: {
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  });

  const createRegion = (latitude, longitude) => ({
    latitude,
    longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationData(latitude, longitude);
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const requestLocationPermission = async () => {
    Platform.OS === "android"
      ? await requestAndroidLocationPermission()
      : await requestIOSLocationPermission();
  };

  const requestAndroidLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Location Access Required",
          message: "This app needs to access your location",
          buttonNegative: "Cancel",
          buttonPositive: "OK",
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const requestIOSLocationPermission = async () => {
    try {
      const statusPermissions = await Geolocation.requestAuthorization(
        "whenInUse"
      );
      if (statusPermissions === "granted") {
        getCurrentLocation();
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <View style={styles.container}>
      <HStack
        zIndex={1}
        bg="transparent"
        justifyContent="space-between"
        mt={12}
        ml={8}
        mr={8}
      >
        <ButtonGoBack />
        <SearchInput />
      </HStack>
      <MapView
        style={styles.map}
        initialRegion={initialRegion}
        onRegionChangeComplete={setRegion}
      >
        {markers.map((data) => (
          <Marker key={data.name} coordinate={data.location}>
            <CustomMarker name={data.name} />
          </Marker>
        ))}
        <Circle
          center={location}
          radius={50}
          fillColor="rgba(255, 158, 0, 0.2)"
          strokeColor="rgba(255, 158, 0, 0.5)"
        />
      </MapView>
      <View justifyContent={"center"} alignItems={"center"} top="55%">
        <Carousel
          ref={carouselRef}
          data={markers}
          renderItem={({ item }) => <Card />}
          sliderWidth={width}
          itemWidth={width}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
