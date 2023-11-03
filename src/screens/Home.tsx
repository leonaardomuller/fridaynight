import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { MagnifyingGlass, SignOut, MapPin } from "phosphor-react-native";
import { Alert } from "react-native";
import { getGenericPassword as getToken } from "react-native-keychain";
import auth from "@react-native-firebase/auth";
import Geolocation from "react-native-geolocation-service";
import { useNavigation } from "@react-navigation/native";
import { LargeEventCard } from "../components/LargeEventCard";
import { SmallEventCard } from "../components/SmallEventCard";
import { useCallback, useEffect, useState } from "react";

type LocationDetails = {
  country_state: string;
  city: string;
  country: string;
  country_code: string;
  neighbourhood?: string;
  postcode: string;
  railway?: string;
  road: string;
  state: string;
};

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [currentAddress, setCurrentAddress] = useState<LocationDetails>(
    {} as LocationDetails
  );
  const [events, setEvents] = useState([]);

  const getLocation = useCallback(async () => {
    try {
      Geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
        fetch(url)
          .then((res) => res.json())
          .then((data) =>
            setCurrentAddress({
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

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const token = await getToken().then(
          (credential) => credential.password
        );
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
    };

    fetchEvents();
  }, []);

  function handleLogout() {
    auth()
      .signOut()
      .catch((error) => {
        console.log(error);
        return Alert.alert("Sair", "Não foi possível fazer logout.");
      });
  }

  function handleNavigateToSearchPage() {
    navigation.navigate("search");
  }

  function handleNavigateToMapPage() {
    navigation.navigate("map");
  }

  function handleNavigateToDetailsPage() {
    navigation.navigate("details");
  }

  return (
    <VStack flex={1} bg="gray.4" px={8} pt={4}>
      <HStack
        w="full"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        pt={12}
      >
        <Heading mb={2} onPress={handleLogout}>
          Friday Night
        </Heading>
        <IconButton
          icon={<MagnifyingGlass color={colors.gray[1]} size={24} />}
          onPress={handleNavigateToSearchPage}
        />
      </HStack>
      <Pressable onPress={handleNavigateToMapPage}>
        <HStack
          w="full"
          bg="white"
          justifyContent="space-between"
          p={4}
          rounded="2xl"
          mb={6}
        >
          <VStack alignSelf="center">
            <Text fontSize={16} color={colors.gray[1]}>
              Find throw the map
            </Text>
            <Text color={colors.gray[1]}>
              {currentAddress.city + ", " + currentAddress.country_state}
            </Text>
          </VStack>
          <Box h="50px" w="50px">
            <Image
              source={{
                uri: "https://picsum.photos/200/200",
              }}
              alt="Alternate Text"
              w="full"
              h="full"
              rounded="xl"
            />
          </Box>
        </HStack>
      </Pressable>

      <Heading mb={2}>Featured</Heading>
      <LargeEventCard {...events[0]} />
      <Heading mb={2} mt={6}>
        Popular Events
      </Heading>

      <ScrollView
        pt={8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
      >
        {events.slice(1).map((event) => {
          return <SmallEventCard key={event.id} {...event} />;
        })}
      </ScrollView>
    </VStack>
  );
}
