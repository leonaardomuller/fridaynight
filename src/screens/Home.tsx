import {
  Box,
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
import { MagnifyingGlass } from "phosphor-react-native";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { useNavigation } from "@react-navigation/native";
import { LargeEventCard } from "../components/LargeEventCard";
import { SmallEventCard } from "../components/SmallEventCard";
import { useMyCurrentLocationStore } from "../stores/my-current-location-store";
import { useEventsStore } from "../stores/events-store";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  const { setIsAuthenticated } = useUserAuthenticatedStore();

  const { events } = useEventsStore();
  const { city, country_state } = useMyCurrentLocationStore();

  function handleLogout() {
    auth()
      .signOut()
      .then(() => setIsAuthenticated(false))
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
            <Text color={colors.gray[1]}>{city + ", " + country_state}</Text>
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
