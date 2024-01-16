import { useState } from "react";
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
import { useEventsStore } from "../stores/events-store";
import { useMyCurrentLocationStore } from "../stores/my-current-location-store";

export function Search() {
  const { colors } = useTheme();
  const { events } = useEventsStore();
  const { road, city } = useMyCurrentLocationStore();

  const [searchInput, setSearchInput] = useState("");

  const handleSearchChange = (text) => {
    setSearchInput(text);
  };

  const filteredEvents = events.filter((event) => {
    return event.title.toLowerCase().includes(searchInput.toLowerCase());
  });

  return (
    <VStack flex={1} bg="white">
      <Header title="Buscar"></Header>
      <VStack flex={1} bg="gray.4" px={8} pt={4} rounded="2xl" space={4}>
        <HStack
          w="full"
          // maxW={250}
          alignItems="center"
          justifyContent="space-between"
          h={14}
        >
          <Input
            w="full"
            placeholder="Procure eventos em..."
            mb={4}
            mt={4}
            onChangeText={handleSearchChange}
            InputLeftElement={
              <Icon as={<MagnifyingGlass color={colors.gray[1]} />} ml={4} />
            }
          />
          {/* <Center h="full" bg="white" rounded="2xl" px={2} ml={4}>
            <IconButton
              icon={<SlidersHorizontal color={colors.gray[1]} size={24} />}
            />
          </Center> */}
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
            {road + ", " + city}
          </Text>
        </HStack>
        <ScrollView
          pt={4}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          {filteredEvents.map((event) => {
            return <SmallEventCard key={event.id} {...event} />;
          })}
        </ScrollView>
      </VStack>
    </VStack>
  );
}
