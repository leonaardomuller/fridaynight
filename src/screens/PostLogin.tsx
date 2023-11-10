import { View, Text, useTheme } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { getGenericPassword as getToken } from "react-native-keychain";
import Geolocation from "react-native-geolocation-service";
import { useCallback, useEffect, useRef } from "react";
import { useMyCurrentLocationStore } from "../stores/my-current-location-store";
import { useEventsStore } from "../stores/events-store";
import { useInterestsStore } from "../stores/interests-store";
import { useNavigation } from "@react-navigation/native";
import { Animated, Easing } from "react-native";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";

export function PostLogin() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const theme = useTheme();
  const navigation = useNavigation();
  const { setMyCurrentLocation } = useMyCurrentLocationStore();
  const { isAuthenticated } = useUserAuthenticatedStore();
  const { setEvents } = useEventsStore();
  const { setInterests } = useInterestsStore();

  function navigateToInterestPage() {
    navigation.navigate("interests");
  }

  function navigateToHomePage() {
    navigation.navigate("home");
  }

  const getCurrentLocation = useCallback(async () => {
    try {
      Geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            setMyCurrentLocation({
              country_state: data.address["ISO3166-2-lvl4"],
              city: data.address.city,
              country: data.address.country,
              country_code: data.address.country_code,
              neighbourhood: data.address.neighbourhood,
              postcode: data.address.postcode,
              railway: data.address.railway,
              road: data.address.road,
              state: data.address.state,
            })
          );
      });
    } catch (err) {
      console.error(err);
    }
  }, []);

  const getEvents = useCallback(async () => {
    try {
      const token = await getToken().then((credential) => credential.password);
      const response = await fetch(`http://localhost:3333/events`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const eventsData = await response.json();
      setEvents(eventsData.events);
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const getInterests = useCallback(async () => {
    const token = await getToken().then((credential) => credential.password);

    const interestsData = await fetch(`http://localhost:3333/interests`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((data) => {
        return data;
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log({ error });
      });
    setInterests(interestsData.interests);
  }, []);

  const getUser = useCallback(async () => {
    try {
      const token = await getToken().then((credential) => credential.password);
      const response = await fetch(`http://localhost:3333/account`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const userData = await response.json();
      if (userData.user.interests.length > 0) {
        navigateToHomePage();
        return;
      }
      navigateToInterestPage();
    } catch (error) {
      console.log({ error });
    }
  }, []);

  const spin = () => {
    spinValue.setValue(0);
    Animated.timing(spinValue, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => spin());
  };

  const spinInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    spin();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      getCurrentLocation();
      getEvents();
      getInterests();
      getUser();
    }
  }, [isAuthenticated]);

  return (
    <View
      flex={1}
      justifyContent="center"
      alignItems="center"
      bg={theme.colors.purple[1]}
    >
      <Animated.View style={{ transform: [{ rotate: spinInterpolate }] }}>
        <AntDesign name="loading1" size={50} color={theme.colors.gray[3]} />
      </Animated.View>
      <Text fontSize="xl" mt={4} color={theme.colors.gray[3]}>
        Loading...
      </Text>
    </View>
  );
}
