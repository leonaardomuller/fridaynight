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
import auth from "@react-native-firebase/auth";
import { Header } from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { LargeEventCard } from "../components/LargeEventCard";
import { SmallEventCard } from "../components/SmallEventCard";
const popularEvents = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

export function Home() {
  const { colors } = useTheme();
  const navigation = useNavigation();

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
            <Text color={colors.gray[1]}>New York, US</Text>
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
      <LargeEventCard />
      <Heading mb={2} mt={6}>
        Popular Events
      </Heading>

      <ScrollView
        pt={8}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
      >
        {popularEvents.map((number) => {
          return <SmallEventCard key={number} />;
        })}
      </ScrollView>
    </VStack>
  );
}
