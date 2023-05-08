import { useState } from "react";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import Logo from "../assets/logo.svg";

import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { Alert } from "react-native";

export function SignIn() {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Login", "Informe e-mail e senha");
    }

    setIsLoading(true);

    auth()
      .signInWithEmailAndPassword(email, password)
      // .then((response) => {
      //   console.log(response);
      // })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);

        if (error.code === "auth/invalid-email") {
          return Alert.alert("Login", "E-mail inválida.");
        }
        if (error.code === "auth/user-not-found") {
          return Alert.alert("Login", "E-mail ou senha inválidos.");
        }
        if (error.code === "auth/wrong-password") {
          return Alert.alert("Login", "E-mail ou senha inválidos.");
        }

        return Alert.alert("Não foi possível acessar.");
      });
  }

  return (
    <VStack flex={1} alignItems="center" bg="purple.2" px={8} pt={24}>
      <Logo />

      <Heading color="white" fontSize="xl" mt={20} mb={6}>
        Acesse sua conta no Friday Night
      </Heading>

      <Input
        placeholder="Login"
        mb={4}
        mt={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[1]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        mb={8}
        placeholder="Senha"
        InputLeftElement={<Icon as={<Key color={colors.gray[1]} />} ml={4} />}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSignIn}
        isLoading={isLoading}
      />
    </VStack>
  );
}
