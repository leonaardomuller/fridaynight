import { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { setGenericPassword as setToken } from "react-native-keychain";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";

export function SignIn() {
  const { colors } = useTheme();

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Login", "Informe e-mail e senha");
    }

    setIsLoading(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const token = await response.user.getIdTokenResult();

      if (
        new Date(token.expirationTime).getTime() <=
        Date.now() + 5 * 60 * 1000
      ) {
        // If the token is about to expire in 5 minutes
        const refreshedToken = await response.user.getIdToken(true);
        await setToken("access_token", refreshedToken);
        console.log("Token Refreshed");
      } else {
        console.log("Failed to Refresh Token");
        await setToken("access_token", token.token);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);

      switch (error.code) {
        case "auth/invalid-email":
          Alert.alert("Login", "E-mail inválida.");
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          Alert.alert("Login", "E-mail ou senha inválidos.");
          break;
        default:
          Alert.alert("Login", error.message || "Não foi possível acessar.");
          break;
      }
    }
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
