import { useNavigation } from "@react-navigation/native";
import {
  Box,
  HStack,
  IconButton,
  Image,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Heart, Minus, Plus, Trash } from "phosphor-react-native";

export function OrderCard() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNavigateToDetailsPage() {
    navigation.navigate("details");
  }
  return (
    <HStack
      w="full"
      pb={4}
      borderBottomWidth={2}
      borderBottomColor={colors.purple[1]}
      mb={8}
    >
      <Image
        source={{
          uri: "https://picsum.photos/200/200",
        }}
        alt="Alternate Text"
        w={24}
        h={24}
        alignSelf="center"
        rounded="xl"
      />
      <VStack ml={4} justifyContent="space-between">
        <Text color={colors.purple[1]}>DISCOTECHNIQUE: Dead Sexy</Text>
        <Text color={colors.gray[2]}>Sun, 31 Oct 2022 - 09:00 PM</Text>
        <HStack justifyContent="space-between">
          <HStack alignItems="center">
            <IconButton
              bg="gray.3"
              icon={<Minus color={colors.gray[1]} size={16} />}
            />
            <Text fontSize="xl" mx={4}>
              1
            </Text>
            <IconButton
              bg="gray.3"
              icon={<Plus color={colors.gray[1]} size={16} />}
            />
          </HStack>
          <IconButton
            m={1}
            icon={<Trash color={colors.red[600]} size={24} />}
          />
        </HStack>
      </VStack>
    </HStack>
  );
}
