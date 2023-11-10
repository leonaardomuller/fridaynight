import { useState, useEffect } from "react";
import auth from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";
import { SignUp } from "../screens/SignUp";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="sign-in" component={SignIn} />
      <AuthStack.Screen name="sign-up" component={SignUp} />
    </AuthStack.Navigator>
  );
}

export function Routes() {
  const [loading, setIsLoading] = useState(true);
  const { user, setUser } = useUserAuthenticatedStore();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((response) => {
      setUser(response);
      setIsLoading(false);
    });
    return subscriber;
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {user ? <AppRoutes /> : <AuthStackScreen />}
    </NavigationContainer>
  );
}
