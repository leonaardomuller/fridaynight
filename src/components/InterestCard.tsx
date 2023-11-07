import {
  Heading,
  Text,
  Image,
  Container,
  Pressable,
  useTheme,
  View,
} from "native-base";
import React, { useState } from "react";
import RockSVG from "../assets/interests/rock.svg";
import SertanejoSVG from "../assets/interests/sertanejo.svg";
import ReggaeSVG from "../assets/interests/reggae.svg";
import EletronicaSVG from "../assets/interests/eletronica.svg";
import CountrySVG from "../assets/interests/country.svg";
interface InterestCardProps {
  id: string;
  gender: string;
  imageUrl: string[];
  followers: any[];
  index: number;
  handleSelectInterests: (interestSelected: string) => void;
}

const genreImages = {
  rock: <RockSVG height="90px" width="100%" />,
  sertanejo: <SertanejoSVG height="90px" width="100%" />,
  eletronica: <EletronicaSVG height="90px" width="100%" />,
  reggae: <ReggaeSVG height="90px" width="100%" />,
  country: <CountrySVG height="90px" width="100%" />,
  // default: require('../assets/interests/default.svg'), // Default image if you have one
};

export const InterestCard: React.FC<InterestCardProps> = ({
  id,
  imageUrl = [`https://source.unsplash.com/400x400/?music`],
  gender,
  followers,
  handleSelectInterests,
  index,
}: InterestCardProps) => {
  const { colors } = useTheme();
  const [isSelected, setIsSelected] = useState(false);
  const isLast = index % 2 === 1;

  const imageSource = genreImages[gender.toLowerCase()]
    ? genreImages[gender.toLowerCase()]
    : { uri: imageUrl[0] };

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
        <View height="90px" width="100%" marginTop={2} rounded="2xl">
          {imageSource}
        </View>
        <Heading fontSize="xl" mt={2} mb={2}>
          {gender}
        </Heading>
        <Text mb={4}>{followers?.length ?? 0} followers</Text>
      </Pressable>
    </Container>
  );
};
