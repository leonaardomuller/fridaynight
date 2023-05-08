import { useNavigation } from "@react-navigation/native";
import {
  Box,
  Center,
  Heading,
  HStack,
  IconButton,
  Image,
  Pressable,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { CheckCircle, Circle, Heart } from "phosphor-react-native";

export function TicketType() {
  const { colors } = useTheme();
  const navigation = useNavigation();

  function handleNavigateToDetailsPage() {
    navigation.navigate("details");
  }
  return (
    <>
      <Pressable>
        <HStack
          bg="gray.3"
          justifyContent="space-between"
          alignItems="center"
          rounded="2xl"
          borderWidth={2}
          borderColor="purple.1"
          mt={4}
          p={4}
        >
          <VStack justifyContent="space-between" mx={2} maxW={56}>
            <Heading fontSize="xl" mb={1}>
              General Admission
            </Heading>
            <Text color={colors.purple[1]}>
              R$90 + <Text color={colors.gray[2]}>R$5.01 Fee</Text>
            </Text>
          </VStack>
          <IconButton
            pr={0}
            icon={
              <CheckCircle color={colors.purple[1]} size={40} weight="fill" />
            }
          />
        </HStack>
      </Pressable>
      <Pressable>
        <HStack
          bg="white"
          justifyContent="space-between"
          alignItems="center"
          rounded="2xl"
          // borderWidth={2}
          // borderColor="purple.1"
          mt={4}
          p={4}
        >
          <VStack justifyContent="space-between" mx={2}>
            <Heading fontSize="xl" mb={1} maxW={56}>
              Access to VIP Lounge
            </Heading>
            <Text color={colors.purple[1]}>
              R$90 + <Text color={colors.gray[2]}>R$5.01 Fee</Text>
            </Text>
          </VStack>
          <IconButton
            pr={0}
            icon={<Circle color={colors.gray[2]} size={40} weight="thin" />}
          />
        </HStack>
      </Pressable>
    </>
  );
}
