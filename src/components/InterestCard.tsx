import {
  Heading,
  Text,
  Image,
  Container,
  Pressable,
  useTheme,
} from "native-base";
import React, { useState } from "react";
import { Customer } from "../screens/Interests";
interface InterestCardProps {
  id: string;
  gender: string;
  imageUrl: string;
  followers: Customer[];
  index: number;
  handleSelectInterests: (interestSelected: string) => void;
}

export const InterestCard: React.FC<InterestCardProps> = ({
  id,
  imageUrl,
  gender,
  followers,
  handleSelectInterests,
  index,
}: InterestCardProps) => {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  const isLast = index % 2 === 1;

  const handlePress = () => {
    setIsSelected(!isSelected);
    handleSelectInterests(id);
  };

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
        onPress={handlePress}
        borderWidth={2}
        borderColor={isSelected ? colors.purple[1] : colors.white}
        rounded="3xl"
      >
        <Image
          source={{
            uri: `https://source.unsplash.com/400x400/?${gender}%20music`,
          }}
          alt="Interest"
          h="90px"
          w="90%"
          mt={2}
          rounded="2xl"
        />
        <Heading fontSize="xl" mt={2} mb={2}>
          {gender}
        </Heading>
        <Text mb={4}>{followers?.length ?? 0} followers</Text>
      </Pressable>
    </Container>
  );
};
