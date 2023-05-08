import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  IconButton,
  VStack,
  useTheme,
  Text,
  Heading,
  ScrollView,
  FlatList,
} from "native-base";
import { CaretLeft, Scroll } from "phosphor-react-native";
import { Button } from "../components/Button";
import { Example } from "../components/Example";
import { Logout } from "../components/Logout";
import { InterestCard } from "../components/InterestCard";
import { Header } from "../components/Header";
function getRandomArbitrary(min, max) {
  return Math.trunc(Math.random() * (max - min) + min);
}
const interests = [
  { title: "Sertanejo", followers: getRandomArbitrary(100, 10000) },
  { title: "Rock", followers: getRandomArbitrary(100, 10000) },
  { title: "Country", followers: getRandomArbitrary(100, 10000) },
  { title: "Samba", followers: getRandomArbitrary(100, 10000) },
  { title: "Pagode", followers: getRandomArbitrary(100, 10000) },
  { title: "Hip Hop", followers: getRandomArbitrary(100, 10000) },
  { title: "Reggae", followers: getRandomArbitrary(100, 10000) },
  { title: "Techno", followers: getRandomArbitrary(100, 10000) },
  { title: "Sertanejo", followers: getRandomArbitrary(100, 10000) },
];

export function Interests() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleFinishInterestsSelection() {
    navigation.navigate("home");
  }
  return (
    <VStack flex={1} bg="white">
      <Header title="Interests" />
      <VStack flex={1} bg="gray.4" px={8} pt={4} rounded="2xl">
        <Heading mb={2}>Choose Interests</Heading>
        <Text color={colors.gray[1]} mb={2}>
          Choose your favorite interest to get new shows all in one place
          related to it
        </Text>
        <ScrollView
          pt={8}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          <HStack flexWrap="wrap">
            {interests.map(({ title, followers }, index) => {
              return (
                <InterestCard
                  key={index}
                  index={index}
                  title={title}
                  quantityFollowers={followers}
                />
              );
            })}
          </HStack>
        </ScrollView>
        <Button title="Finish" onPress={handleFinishInterestsSelection} />
      </VStack>
    </VStack>
  );
}
