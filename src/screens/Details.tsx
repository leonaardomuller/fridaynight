import {
  Box,
  Button as NativeBaseButton,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Calendar, Heart, MapPin } from "phosphor-react-native";
import Members from "../assets/members.svg";
import Map from "../assets/map.svg";
import { Button } from "../components/Button";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ButtonGoBack } from "../components/ButtonGoBack";
import { Event } from "../stores/events-store";
import { formatDate } from "../utils/format-date";

export function Details() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();

  const { title, imagesUrl, description, startsAt } = route.params as Event;
  console.log("route.params", route.params);

  function handleBuyTicket() {
    navigation.navigate("order");
  }

  return (
    <VStack flex={1} bg="gray.4">
      <HStack
        bg="transparent"
        w="full"
        justifyContent="space-between"
        alignItems="center"
        zIndex={1}
        position="absolute"
        pt={12}
        p={8}
      >
        <ButtonGoBack />
        {/* <IconButton
          bg="white"
          opacity={50}
          icon={<Heart size={26} color={colors.red[600]} weight="fill" />}
          // onPress={handleLike}
        /> */}
      </HStack>
      <Image
        source={{
          uri: imagesUrl[1] || imagesUrl[0] || "https://picsum.photos/200/200",
        }}
        h={72}
        alt="Alternate Text"
      />

      <Box px={8}>
        <Box
          w="full"
          justifyContent="space-between"
          alignSelf="center"
          h={32}
          p={4}
          bg="white"
          rounded="2xl"
          bottom={16}
        >
          <Heading>{title}</Heading>
          <HStack justifyContent="space-between">
            <VStack>
              <HStack alignItems="center">
                <Calendar color={colors.gray[2]} size={16} />
                <Text color="gray.2" ml={2}>
                  {formatDate(startsAt)}
                </Text>
              </HStack>
              <HStack alignItems="center">
                <MapPin color={colors.gray[2]} size={16} />
                <Text color="gray.2" ml={2}>
                  North Beach - 1,2km
                </Text>
              </HStack>
            </VStack>
            <Box alignSelf="flex-end">{/* <Members /> */}</Box>
          </HStack>
        </Box>
        <HStack
          w="full"
          alignSelf="center"
          alignItems="center"
          justifyContent="space-between"
          bg="transparent"
          pb={4}
          bottom={6}
          borderBottomWidth={2}
          borderBottomColor={colors.purple[1]}
        >
          <HStack alignItems="center">
            <Image
              source={{
                uri: "https://picsum.photos/200/200",
              }}
              h={16}
              w={16}
              rounded={50}
              alt="Alternate Text"
            />
            <Box ml={4}>
              <Heading fontSize="lg" color="gray.1">
                Adam Levine
              </Heading>
              <Text color="gray.2">Organizador</Text>
            </Box>
          </HStack>
          {/* <NativeBaseButton
            bg="gray.3"
            rounded="2xl"
            px={4}
            _pressed={{ bg: "gray.2" }}
          >
            <Text color="gray.1">Follow</Text>
          </NativeBaseButton> */}
        </HStack>
        <Text color="gray.2">
          {description}
          {/* <Text color="purple.1">Read more...</Text> */}
        </Text>
        {/* <Image
          source={{
            uri: "https://picsum.photos/200/200",
          }}
          h={32}
          mt={4}
          rounded="2xl"
          alt="Alternate Text"
        /> */}
      </Box>
      {/* <Button title="Buy Ticket R$90" onPress={handleBuyTicket} /> */}
    </VStack>
  );
}
