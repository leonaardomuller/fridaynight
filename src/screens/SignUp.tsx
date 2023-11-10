import { useState } from "react";
import { Alert } from "react-native";
import auth from "@react-native-firebase/auth";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key, User } from "phosphor-react-native";

import { setGenericPassword as setToken } from "react-native-keychain";

import Logo from "../assets/logo.svg";
import { Input } from "../components/Input";
import { Button } from "../components/Button";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";
import { useLoadingStore } from "../stores/loading-store";
import { useNavigation } from "@react-navigation/native";

export function SignUp() {
  const { colors } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigation = useNavigation();

  const { isLoading, setIsLoading } = useLoadingStore();
  const { setIsAuthenticated } = useUserAuthenticatedStore();

  async function handleGoBack() {
    navigation.goBack();
  }

  async function handleSignUp() {
    if (!email || !password || !confirmPassword) {
      return Alert.alert("Sign Up", "Please fill in all fields.");
    }

    if (password !== confirmPassword) {
      return Alert.alert("Sign Up", "The passwords do not match.");
    }

    setIsLoading(true);

    try {
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      const id = response.user.uid;
      const token = await response.user.getIdTokenResult();
      await setToken("access_token", token.token);

      const apiResponse = await fetch(`http://localhost:3333/accounts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          email,
          password,
        }),
      });
      setIsAuthenticated(true);

      if (!apiResponse.ok) {
        throw new Error(`HTTP error! Status: ${apiResponse.status}`);
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);

      let errorMessage = "Unable to sign up.";
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "Email address is already in use.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Email address is not valid.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else {
        errorMessage = error.message || errorMessage;
      }
      Alert.alert("Sign Up", errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <VStack flex={1} alignItems="center" bg="purple.2" px={8} pt={24}>
      <Logo />
      <Heading color="white" fontSize="xl" mt={20} mb={6}>
        Create your account on Friday Night
      </Heading>
      <Input
        placeholder="Name"
        mb={4}
        InputLeftElement={<Icon as={<User color={colors.gray[1]} />} ml={4} />}
        onChangeText={setName}
      />
      <Input
        placeholder="Email"
        mb={4}
        InputLeftElement={
          <Icon as={<Envelope color={colors.gray[1]} />} ml={4} />
        }
        onChangeText={setEmail}
      />
      <Input
        placeholder="Password"
        mb={4}
        InputLeftElement={<Icon as={<Key color={colors.gray[1]} />} ml={4} />}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Input
        placeholder="Confirm Password"
        mb={8}
        InputLeftElement={<Icon as={<Key color={colors.gray[1]} />} ml={4} />}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        w="full"
        onPress={handleSignUp}
        isLoading={isLoading}
        position="relative"
        mb={4}
      />
      <Button
        title="Go Back"
        w="full"
        onPress={handleGoBack}
        isLoading={isLoading}
        position="relative"
        variant="secondary"
        mb={4}
      />
    </VStack>
  );
}
