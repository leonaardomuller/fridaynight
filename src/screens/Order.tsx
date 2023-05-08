import {
  Box,
  Heading,
  HStack,
  ScrollView,
  Text,
  useTheme,
  VStack,
} from "native-base";
import { Button } from "../components/Button";
import { Header } from "../components/Header";
import { OrderCard } from "../components/OrderCard";
import { TicketType } from "../components/TicketType";

export function Order() {
  const { colors } = useTheme();
  return (
    <VStack flex={1}>
      <ScrollView>
        <Header title="Order" />
        <VStack flex={1} bg="gray.4" px={8} pt={4}>
          <OrderCard />
          <HStack justifyContent="space-between" alignItems="center">
            <Heading>Ticket Type</Heading>
            <Text color={colors.purple[1]}>Have a code ?</Text>
          </HStack>
          <TicketType />
          <HStack my={8} borderBottomWidth={2} borderBottomColor="purple.1" />
          <Box bg="white" p={4} rounded="2xl" mb={32}>
            <Heading fontSize="xl">Order Summary</Heading>
            <HStack
              my={1}
              borderBottomWidth={2}
              borderBottomColor="purple.1"
              mb={2}
            />
            <HStack justifyContent="space-between">
              <Text fontSize="md" color={colors.gray[2]}>
                Subtotal
              </Text>
              <Text fontSize="md" color={colors.gray[1]}>
                R$90.00
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="md" color={colors.gray[2]}>
                Fees
              </Text>
              <Text fontSize="md" color={colors.gray[1]}>
                R$05.01
              </Text>
            </HStack>
            <HStack justifyContent="space-between">
              <Text fontSize="md" color={colors.gray[2]}>
                Sales Tax
              </Text>
              <Text fontSize="md" color={colors.gray[1]}>
                R$03.50
              </Text>
            </HStack>
            <HStack justifyContent="space-between" mt={4}>
              <Text fontSize="xl" color={colors.gray[2]}>
                Total
              </Text>
              <Text fontSize="xl" color={colors.gray[1]}>
                R$98.51
              </Text>
            </HStack>
          </Box>
        </VStack>
      </ScrollView>
      <Button title="Checkout R$ 98.51"></Button>
    </VStack>
  );
}
