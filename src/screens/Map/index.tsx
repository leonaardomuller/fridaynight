import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  useWindowDimensions,
} from "react-native";
import { HStack, View } from "native-base";
import MapView, { Marker, Circle, MapPressEvent } from "react-native-maps";
import { CustomMarker } from "./components/CustomMarker";
import Geolocation from "react-native-geolocation-service";
import { ButtonGoBack } from "../../components/ButtonGoBack";
import { SearchInput } from "./components/SearchInput";
import { Card } from "./components/Carousel/components/Card";
import Carousel from "react-native-snap-carousel";
import { useSelectedCardsCoordinates } from "../../stores/selected-card-coordinates";
import { generateEventName } from "./utils";

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
  const { latitude, longitude, setCoordinates } = useSelectedCardsCoordinates();

  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  }, [latitude, longitude]);

  useEffect(() => {
    console.log(region);
  }, [region]);

  const setLocationData = (latitude, longitude) => {
    const dif = 0.003;
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

  const onMapPress = (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    const randomEventName = generateEventName();
    const newMarker = createMarker(randomEventName, latitude, longitude);
    setMarkers([...markers, newMarker]);
    console.log(e.nativeEvent.coordinate);
  };

  const handleSlideChange = (index: number) => {
    console.log(index);
    const currentMarker = markers[index];
    if (currentMarker) {
      console.log(
        "Setting coordinates to",
        currentMarker.location.latitude,
        currentMarker.location.longitude
      );
      setCoordinates(
        currentMarker.location.latitude,
        currentMarker.location.longitude
      );
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
        region={region}
        onRegionChangeComplete={setRegion}
        onPress={onMapPress}
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
          renderItem={() => <Card {...markers} />}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={handleSlideChange}
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
