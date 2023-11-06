// ProtectedRoute.tsx
import React from "react";
import { View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUserAuthenticatedStore } from "../stores/user-authenticated-store";

type Props = {
  ProtectedScreen: React.ComponentType<any>;
};

const ProtectedRoute: React.FC<Props> = ({ ProtectedScreen }) => {
  const navigation = useNavigation();
  const { isAuthenticated } = useUserAuthenticatedStore();

  if (!isAuthenticated) {
    // If not authenticated, redirect to the "SignIn" route
    navigation.navigate("login");
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <ProtectedScreen />;
};

export default ProtectedRoute;
