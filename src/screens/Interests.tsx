import { useNavigation } from "@react-navigation/native";
import {
  HStack,
  VStack,
  useTheme,
  Text,
  Heading,
  ScrollView,
} from "native-base";
import auth from "@react-native-firebase/auth";
import { Button } from "../components/Button";
import { InterestCard } from "../components/InterestCard";
import { Header } from "../components/Header";
import { useEffect, useState } from "react";
import { getGenericPassword as getToken } from "react-native-keychain";

export type Customer = {
  id: string;
  name: string;
  interests: InterestProps[];
};

export type InterestProps = {
  id: string;
  gender: string;
  imageUrl: string;
  followers: Customer[];
};

export function Interests() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState<InterestProps[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<String[]>([]);

  useEffect(() => {
    const fetchInterests = async () => {
      const token = await getToken().then((credential) => credential.password);

      const interestsData = await fetch(`http://localhost:3333/interests`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((data) => {
          return data;
        })
        .then((response) => {
          return response.json();
        })
        .catch((error) => {
          console.log({ error });
        });
      setInterests(interestsData.interests);
      setSelectedInterests([]);
    };

    fetchInterests();
  }, []);

  useEffect(() => {
    const fetchInterests = async () => {
      const token = await getToken().then((credential) => credential.password);
      const interestsData = await fetch(`http://localhost:3333/interests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((data) => data)
        .then((response) => response.json())
        .catch((error) => {
          console.log({ error });
        });
      setInterests(interestsData.interests);
      setSelectedInterests([]);
    };

    fetchInterests();
  }, []);

  function handleSelectInterests(id: string) {
    if (selectedInterests.includes(id)) {
      // Remove o interesse selecionado se ele já estiver presente no array
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      // Adiciona o interesse selecionado se ele ainda não estiver no array
      setSelectedInterests([...selectedInterests, id]);
    }
  }

  async function handleSetSelectedInterests() {
    setIsLoading(true);
    const token = await getToken().then((credential) => credential.password);
    await fetch(`http://localhost:3333/interests`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ interestIds: selectedInterests }),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log({ error });
      })
      .finally(() => {
        navigation.navigate("home");
        setIsLoading(false);
      });
    setSelectedInterests([]);
  }

  return (
    <VStack flex={1} bg="white">
      <Header title="Interests" showButtonGoBack={false} />
      <VStack flex={1} bg="gray.4" px={8} pt={4} rounded="2xl">
        <Heading mb={2}>Choose Interests</Heading>
        <Text color={colors.gray[1]} mb={2}>
          Choose your favorite interest to get new shows all in one place
          related to it
        </Text>
        <ScrollView
          pt={8}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        >
          <HStack flexWrap="wrap">
            {interests?.map(
              ({ id, gender, imageUrl, followers }: InterestProps, index) => (
                <InterestCard
                  key={id}
                  id={id}
                  gender={gender}
                  imageUrl={imageUrl}
                  followers={followers}
                  index={index}
                  handleSelectInterests={handleSelectInterests}
                />
              )
            )}
          </HStack>
        </ScrollView>
        <Button title="Finish" onPress={handleSetSelectedInterests} />
      </VStack>
    </VStack>
  );
}
