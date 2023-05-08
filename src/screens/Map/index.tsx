import React, { useEffect, useState } from "react";
import { StyleSheet, View, Platform, PermissionsAndroid } from "react-native";
import { HStack } from "native-base";
import MapView, { Marker, Circle } from "react-native-maps";
import { CustomMarker } from "./components/CustomMarker";
import Geolocation from "react-native-geolocation-service";
import { ButtonGoBack } from "../../components/ButtonGoBack";
import { SearchInput } from "./components/SearchInput";
import { Card } from "./components/Carousel/components/Card";
export function Map() {
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

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      await requestAndroidLocationPermission();
    } else if (Platform.OS === "ios") {
      await requestIOSLocationPermission();
    } else {
      getCurrentLocation();
    }
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

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const dif = 0.003;
        const { latitude, longitude } = position.coords;
        console.log(latitude, longitude);
        setMarkers([
          {
            name: "Event 1",
            location: {
              latitude: latitude + dif,
              longitude: longitude + dif,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
          {
            name: "Event 2",
            location: {
              latitude: latitude - dif,
              longitude: longitude - dif,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            },
          },
        ]);
        setInitialRegion({
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        });

        setRegion({
          ...region,
          latitude,
          longitude,
        });

        setLocation({
          latitude,
          longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
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
        onRegionChangeComplete={(region) => setRegion(region)}
      >
        {markers.map((data) => {
          return (
            <Marker key={data.name} coordinate={data.location}>
              <CustomMarker name={data.name} />
            </Marker>
          );
        })}
        <Circle
          center={location}
          radius={50}
          fillColor="rgba(255, 158, 0, 0.2)"
          strokeColor="rgba(255, 158, 0, 0.5)"
        />
      </MapView>
      <Card />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  safeArea: { flex: 1 },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
