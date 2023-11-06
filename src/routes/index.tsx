import { useState, useEffect } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { SignIn } from "../screens/SignIn";
import { AppRoutes } from "./app.routes";
import { Loading } from "../components/Loading";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";

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
      {user ? <AppRoutes /> : <SignIn />}
    </NavigationContainer>
  );
}
