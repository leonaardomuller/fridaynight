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
import firestore from "@react-native-firebase/firestore";

export type CustomerProps = {
  id: string;
  name: string;
  interests: InterestProps[];
};

export type InterestProps = {
  id: string;
  gender: string;
  imageUrl: string;
  followers: CustomerProps[];
};

export function Interests() {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [interests, setInterests] = useState<InterestProps[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<String[]>([]);
  useEffect(() => {
    const currentUser = auth().currentUser;
    const customersCollection = firestore().collection("customers");
    const query = customersCollection.where("id", "==", currentUser.uid);
    query.get().then((querySnapshot) => {
      if (querySnapshot.size > 0) {
        navigation.navigate("home");
        console.log("User already exists in the 'customers' collection.");
      }
    });

    const fetchInterests = async () => {
      const querySnapshot = await firestore().collection("interests").get();
      const interestsData: InterestProps[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as InterestProps;
        return data;
      });
      setInterests(interestsData);
      setSelectedInterests([]);
    };

    fetchInterests();
  }, []);

  function handleFinishInterestsSelection() {
    navigation.navigate("home");
  }

  function handleSelectInterests(id: string) {
    if (selectedInterests.includes(id)) {
      // Remove o interesse selecionado se ele já estiver presente no array
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else {
      // Adiciona o interesse selecionado se ele ainda não estiver no array
      setSelectedInterests([...selectedInterests, id]);
    }
  }

  function handleSetSelectedInterests() {
    setIsLoading(true);
    const currentUser = auth().currentUser;
    firestore()
      .collection("customers")
      .add({
        id: currentUser.uid,
        name: currentUser.displayName,
        interests: selectedInterests,
      })
      .then(() => {
        alert("Interesses registrados.");
        navigation.navigate("home");
      });

    console.log(currentUser);

    // firestore()
    //   .collection("customers")
    //   .where("id", "==", "409e1763-16c2-4a38-84b6-1eac227e3294")
    //   .onSnapshot((snapshot) => {
    //     console.log(snapshot.docs);
    //     const data = snapshot.docs.map((doc) => {
    //       const { id, name, interests } = doc.data();
    //       console.log(id, name, interests);
    //       return {
    //         id,
    //         name,
    //         interests: selectedInterests,
    //       };
    //     });
    //     return data;
    //   });
    // .then(() => {
    //   alert("Solicitação registrada com sucesso.");
    //   navigation.goBack();
    // })
    // .catch((error) => {
    //   console.log(error);
    //   setIsLoading(false);
    //   return alert("Não foi possível registrar o pedido");
    // });
  }

  return (
    <VStack flex={1} bg="white">
      <Header title="Interests" />
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
            {interests.map(
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
