import {
  Center,
  HStack,
  Icon,
  IconButton,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import {
  MagnifyingGlass,
  MapPin,
  SlidersHorizontal,
} from "phosphor-react-native";
import { Header } from "../components/Header";
import { Input } from "../components/Input";
import { SmallEventCard } from "../components/SmallEventCard";

const popularEvents = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
];

export function Search() {
  const { colors } = useTheme();
  return (
    <VStack flex={1} bg="white">
      <Header title="Search"></Header>
      <VStack flex={1} bg="gray.4" px={8} pt={4} rounded="2xl" space={4}>
        <HStack
          w="full"
          maxW={250}
          alignItems="center"
          justifyContent="space-between"
          h={14}
        >
          <Input
            w="full"
            placeholder="Search events in..."
            mb={4}
            mt={4}
            InputLeftElement={
              <Icon as={<MagnifyingGlass color={colors.gray[1]} />} ml={4} />
            }
            // onChangeText={setEmail}
          />
          <Center h="full" bg="white" rounded="2xl" px={2} ml={4}>
            <IconButton
              icon={<SlidersHorizontal color={colors.gray[1]} size={24} />}
            />
          </Center>
        </HStack>
        <HStack
          bg="gray.3"
          h={14}
          alignItems="center"
          justifyContent="center"
          rounded="2xl"
        >
          <IconButton icon={<MapPin color={colors.gray[1]} size={24} />} />
          <Text fontSize={16} color={colors.gray[1]}>
            My current location
          </Text>
        </HStack>
        <ScrollView
          pt={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          {popularEvents.map((event) => {
            return <SmallEventCard key={event} />;
          })}
        </ScrollView>
      </VStack>
    </VStack>
  );
}
