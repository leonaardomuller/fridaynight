import { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from "phosphor-react-native";

import { setGenericPassword as setToken } from "react-native-keychain";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";
import { useLoadingStore } from "../stores/loading-store";
import { useNavigation } from "@react-navigation/native";

export function SignIn() {
  const { colors } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const { isLoading, setIsLoading } = useLoadingStore();
  const { setIsAuthenticated } = useUserAuthenticatedStore();

  async function handleNavigateSignUp() {
    navigation.navigate("sign-up");
  }

  async function handleSignIn() {
    if (!email || !password) {
      return Alert.alert("Login", "Informe e-mail e senha");
    }

    setIsLoading(true);

    try {
      const response = await auth().signInWithEmailAndPassword(email, password);
      const token = await response.user.getIdTokenResult();
      await setToken("access_token", token.token);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);

      let errorMessage = "Não foi possível acessar.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "E-mail inválida.";
          break;
        case "auth/user-not-found":
        case "auth/wrong-password":
          errorMessage = "E-mail ou senha inválidos.";
          break;
        default:
          errorMessage = error.message || errorMessage;
          break;
      }
      Alert.alert("Login", errorMessage);
    } finally {
      setIsLoading(false); // This will always execute regardless of try/catch result
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
        position="relative"
        mb={4}
      />
      <Button
        title="Criar Usuário"
        w="full"
        onPress={handleNavigateSignUp}
        isLoading={isLoading}
        position="relative"
        variant="secondary"
      />
    </VStack>
  );
}
