import {
  VStack,
  HStack,
  Heading,
  Text,
  Image,
  Center,
  Box,
  Container,
  Pressable,
  IPressableProps,
  useTheme,
} from "native-base";
import { useState } from "react";
interface Props {
  title: string;
  quantityFollowers: number;
  isSelected?: boolean;
  index: number;
}
export function InterestCard({ title, quantityFollowers, index }: Props) {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  const isLast = index % 2 === 1 ? true : false;
  return (
    <Container
      w="full"
      maxWidth="47%"
      mb={4}
      mr={isLast ? "0%" : "6%"}
      bg="white"
      rounded="3xl"
    >
      <Pressable
        w="full"
        alignItems="center"
        onPress={() => setIsSelected(!isSelected)}
        borderWidth={2}
        borderColor={isSelected ? colors.purple[1] : colors.white}
        rounded="3xl"
      >
        <Image
          source={{
            uri: "https://picsum.photos/200/200",
          }}
          alt="Alternate Text"
          h="90px"
          mt={4}
          ml={4}
          m={4}
          w="full"
          rounded="xl"
        />
        <Heading fontSize="xl" mt={2} mb={2}>
          {title}
        </Heading>
        <Text mb={4}>{quantityFollowers} followers</Text>
      </Pressable>
    </Container>
  );
}
