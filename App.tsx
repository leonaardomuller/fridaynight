import { NativeBaseProvider, Box } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { THEME } from "./src/styles/theme";

import { Routes } from "./src/routes";

import { Loading } from "./src/components/Loading";

import { Details } from "./src/screens/Details";
import { Home } from "./src/screens/Home";
import { Interests } from "./src/screens/Interests";
import { Map } from "./src/screens/Map";
import { Order } from "./src/screens/Order";
import { SignIn } from "./src/screens/SignIn";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  return (
    <NativeBaseProvider theme={THEME}>
      {fontsLoaded ? <Routes /> : <Loading />}
    </NativeBaseProvider>
  );
}
