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
import { Heart } from "phosphor-react-native";

export function SmallEventCard() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNavigateToDetailsPage() {
    navigation.navigate("details");
  }
  return (
    <Pressable onPress={handleNavigateToDetailsPage} mb={4}>
      <HStack bg="white" rounded="xl">
        <Image
          source={{
            uri: "https://picsum.photos/200/200",
          }}
          alt="Alternate Text"
          w={20}
          h={20}
          m={2}
          alignSelf="center"
          rounded="xl"
        />
        <VStack p={4}>
          <VStack justifyContent="space-between" maxW="150px">
            <Text color={colors.purple[1]}>23 Oct - 10:00 PM</Text>
            <Text color={colors.gray[1]}>Disco Tehran - Goodbye Party</Text>
          </VStack>
        </VStack>
        <Box>
          <IconButton icon={<Heart color={colors.gray[2]} size={24} />} />
        </Box>
      </HStack>
    </Pressable>
  );
}
