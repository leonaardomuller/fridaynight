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

import Members from "../../../../../assets/members.svg";

export function Card(props) {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNavigateToDetailsPage() {
    navigation.navigate("details");
  }
  return (
    <VStack
      mb={12}
      bg="white"
      h="full"
      w="full"
      maxW="80%"
      maxH="240"
      rounded="xl"
    >
      <Pressable onPress={handleNavigateToDetailsPage}>
        <Image
          source={{
            uri: "https://picsum.photos/200/200",
          }}
          alt="Alternate Text"
          w="full"
          h="60%"
          rounded="xl"
        />
        <VStack p={4}>
          <Heading mb={2}>2000's Hip Hop</Heading>
          <HStack justifyContent="space-between">
            <Box flexDirection="row" alignItems="center">
              <IconButton icon={<MapPin color={colors.gray[1]} size={16} />} />
              <Text color={colors.gray[1]} mb={2}>
                Brooklyn - 1,2km
              </Text>
            </Box>
            <Members />
          </HStack>
        </VStack>
      </Pressable>
    </VStack>
  );
}
