import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Platform,
  PermissionsAndroid,
  useWindowDimensions,
  Modal,
} from "react-native";
import { HStack, View, Button, Text, Box, ScrollView } from "native-base";
import DateTimePicker from "@react-native-community/datetimepicker";
import MapView, { Marker, Circle, MapPressEvent } from "react-native-maps";
import { CustomMarker } from "./components/CustomMarker";
import Geolocation from "react-native-geolocation-service";
import { ButtonGoBack } from "../../components/ButtonGoBack";
import { SearchInput } from "./components/SearchInput";
import { Card } from "./components/Carousel/components/Card";
import Carousel from "react-native-snap-carousel";
import { useSelectedCardsCoordinates } from "../../stores/selected-card-coordinates-store";
import { getGenericPassword as getToken } from "react-native-keychain";
import { Input } from "../../components/Input";
import { Picker } from "@react-native-picker/picker";
import { useEventsStore } from "../../stores/events-store";
import { useInterestsStore } from "../../stores/interests-store";

export function Map() {
  const carouselRef = useRef(null);
  const { width } = useWindowDimensions();

  const [initialRegion, setInitialRegion] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [newMarkerLatitude, setNewMarkerLatitude] = useState(0);
  const [newMarkerLongitude, setNewMarkerLongitude] = useState(0);
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [currentMarker, setCurrentMarker] = useState({});

  const [isDatePickerStartsDateVisible, setDatePickerStartsDateVisible] =
    useState(true);
  const [isDatePickerEndsDateVisible, setDatePickerEndsDateVisible] =
    useState(true);
  const [selectedStartsDate, setSelectedStartsDate] = useState(new Date());
  const [selectedEndsDate, setSelectedEndsDate] = useState(new Date());

  const [selectedGender, setSelectedGender] = useState("default");

  const [region, setRegion] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  });
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const { latitude, longitude, setCoordinates } = useSelectedCardsCoordinates();
  const { events } = useEventsStore();
  const { interests } = useInterestsStore();

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
    const newMarkers = events.map((event) =>
      createMarker(event.title, event.latitude, event.longitude)
    );

    setMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);
  }, []);

  const setLocationData = (latitude, longitude) => {
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
    setModalVisible(true);
    clearForm();
    const { latitude, longitude } = e.nativeEvent.coordinate;
    setNewMarkerLatitude(latitude);
    setNewMarkerLongitude(longitude);
  };

  const createEvent = async () => {
    try {
      const token = await getToken().then((credential) => credential.password);

      const response = await fetch(`http://localhost:3333/events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: eventName,
          description: eventDescription,
          gender: selectedGender,
          latitude: newMarkerLatitude,
          longitude: newMarkerLongitude,
          imagesUrl: ["/assets/image1", "/assets/image2", "/assets/image3"],
          startsAt: selectedStartsDate,
          finishAt: selectedEndsDate,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const jsonData = await response.json();

      const newMarker = createMarker(
        eventName,
        newMarkerLatitude,
        newMarkerLongitude
      );
      setMarkers([...markers, newMarker]);
      return jsonData;
    } catch (error) {
      console.log({ error });
    }
  };

  const clearForm = () => {
    setEventName("");
    setEventDescription("");
  };

  const onSubmitForm = () => {
    createEvent();
    setModalVisible(false);
  };

  const onStartsDateChange = (event, selectedValue) => {
    setDatePickerStartsDateVisible(Platform.OS === "ios"); // keep it visible on iOS
    if (selectedValue) {
      setSelectedStartsDate(selectedValue);
    }
  };

  const onEndsDateChange = (event, selectedValue) => {
    setDatePickerEndsDateVisible(Platform.OS === "ios"); // keep it visible on iOS
    if (selectedValue) {
      setSelectedEndsDate(selectedValue);
    }
  };

  const handleSlideChange = (index: number) => {
    const marker = markers[index];
    if (marker) {
      setCurrentMarker(marker);
      setCoordinates(marker.location.latitude, marker.location.longitude);
    }
  };

  const handleChangeEventName = (value: string) => {
    setEventName(value);
  };

  const handleChangeEventDescription = (value: string) => {
    setEventDescription(value);
  };

  return (
    <View style={styles.container}>
      <HStack
        alignItems={"center"}
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
          <Marker
            key={data.name}
            image={require("./pin.png")}
            coordinate={data.location}
          >
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
      <View top="55%">
        <Carousel
          ref={carouselRef}
          data={markers}
          renderItem={() => (
            <View left={10}>
              <Card {...currentMarker} />
            </View>
          )}
          sliderWidth={width}
          itemWidth={width}
          onSnapToItem={handleSlideChange}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(false);
        }}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ScrollView width={300} marginTop={100}>
            <Box padding={5} bg="white" shadow={3} borderRadius="lg">
              <Text marginBottom={4}>New Event</Text>
              <Button onPress={() => setModalVisible(false)}>Fechar</Button>
              <Input
                placeholder="Name"
                value={eventName}
                onChangeText={handleChangeEventName}
                variant="filled"
                marginBottom={4}
              />

              <Input
                placeholder="Description"
                value={eventDescription}
                onChangeText={handleChangeEventDescription}
                variant="filled"
                marginBottom={4}
              />

              <Input
                placeholder="Latitude"
                variant="filled"
                value={newMarkerLatitude.toString()}
                isReadOnly={true}
                marginBottom={4}
              />
              <Input
                placeholder="Longitude"
                value={newMarkerLongitude.toString()}
                isReadOnly={true}
                variant="filled"
                marginBottom={4}
              />
              <Picker
                selectedValue={selectedGender}
                onValueChange={(itemValue, itemIndex) =>
                  setSelectedGender(itemValue)
                }
              >
                {interests?.map((interest) => {
                  console.log(interests);
                  return (
                    <Picker.Item
                      key={interest.id}
                      label={interest.gender}
                      value={interest.id}
                    />
                  );
                })}
              </Picker>
              <Text marginBottom={4}>Start Datetime</Text>
              {isDatePickerStartsDateVisible && (
                <DateTimePicker
                  value={selectedStartsDate}
                  mode="datetime"
                  display="spinner"
                  onChange={onStartsDateChange}
                />
              )}
              <Text marginBottom={4}>End Datetime</Text>
              {isDatePickerEndsDateVisible && (
                <DateTimePicker
                  value={selectedEndsDate}
                  mode="datetime"
                  display="spinner"
                  onChange={onEndsDateChange}
                />
              )}
              <Button onPress={onSubmitForm}>Submit</Button>
            </Box>
          </ScrollView>
        </View>
      </Modal>
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
