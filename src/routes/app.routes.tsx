// app.routes.tsx
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, Entypo } from "@expo/vector-icons";

import ProtectedRoute from "./ProtectedRoute";
import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Interests } from "../screens/Interests";
import { Map } from "../screens/Map";
import { Order } from "../screens/Order";
import { Search } from "../screens/Search";
import { PostLogin } from "../screens/PostLogin";
import { SignIn } from "../screens/SignIn";

const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="post-login" component={PostLogin} />
      <HomeStack.Screen name="home">
        {() => <ProtectedRoute ProtectedScreen={Home} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="interests">
        {() => <ProtectedRoute ProtectedScreen={Interests} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="map">
        {() => <ProtectedRoute ProtectedScreen={Map} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="order">
        {() => <ProtectedRoute ProtectedScreen={Order} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="details">
        {() => <ProtectedRoute ProtectedScreen={Details} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="search">
        {() => <ProtectedRoute ProtectedScreen={Search} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="login" component={SignIn} />
    </HomeStack.Navigator>
  );
}

export function MapStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="map">
        {() => <ProtectedRoute ProtectedScreen={Map} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="home">
        {() => <ProtectedRoute ProtectedScreen={Home} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="interests">
        {() => <ProtectedRoute ProtectedScreen={Interests} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="order">
        {() => <ProtectedRoute ProtectedScreen={Order} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="details">
        {() => <ProtectedRoute ProtectedScreen={Details} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="post-login" component={PostLogin} />
      <HomeStack.Screen name="search">
        {() => <ProtectedRoute ProtectedScreen={Search} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="login" component={SignIn} />
    </HomeStack.Navigator>
  );
}

export function SearchStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="search">
        {() => <ProtectedRoute ProtectedScreen={Search} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="map">
        {() => <ProtectedRoute ProtectedScreen={Map} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="home">
        {() => <ProtectedRoute ProtectedScreen={Home} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="interests">
        {() => <ProtectedRoute ProtectedScreen={Interests} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="order">
        {() => <ProtectedRoute ProtectedScreen={Order} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="details">
        {() => <ProtectedRoute ProtectedScreen={Details} />}
      </HomeStack.Screen>
      <HomeStack.Screen name="post-login" component={PostLogin} />
      <HomeStack.Screen name="login" component={SignIn} />
    </HomeStack.Navigator>
  );
}

export function AppRoutes() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapStackScreen}
        options={{
          tabBarLabel: "Map",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStackScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="magnifying-glass" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default AppRoutes;
