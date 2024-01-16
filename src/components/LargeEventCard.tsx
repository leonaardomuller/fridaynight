import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { MapPin } from "phosphor-react-native";

import Members from "../assets/members.svg";
export function LargeEventCard(props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNavigateToDetailsPage() {
    navigation.navigate("details", {
      ...props,
    });
  }
  return (
    <VStack bg="white" h="full" maxH="240" rounded="xl">
      <Pressable onPress={handleNavigateToDetailsPage}>
        <Image
          source={{
            uri:
              props.imagesUrl[1] ||
              props.imagesUrl[0] ||
              "https://picsum.photos/200/200",
          }}
          alt="Alternate Text"
          w="full"
          h="60%"
          rounded="xl"
        />
        <VStack p={4}>
          <Heading mb={2}>{props.title}</Heading>
          <HStack justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              <IconButton icon={<MapPin color={colors.gray[1]} size={16} />} />
              <Text color={colors.gray[1]} mb={2}>
                North Beach - 1,2km
              </Text>
            </Box>
            {/* <Members /> */}
          </HStack>
        </VStack>
      </Pressable>
    </VStack>
  );
}
