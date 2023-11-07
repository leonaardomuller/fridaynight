import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Details } from "../screens/Details";
import { Interests } from "../screens/Interests";
import { Map } from "../screens/Map";
import { Order } from "../screens/Order";
import { Search } from "../screens/Search";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons, Entypo } from "@expo/vector-icons";
import { OwnerMap } from "../screens/Owner/OwnerMap";
import { PostLogin } from "../screens/PostLogin";
import { SignIn } from "../screens/SignIn";
import ProtectedRoute from "./ProtectedRoute";

const HomeStack = createNativeStackNavigator();
// Profile 1 = Event User
// Profile 2 = Event Owner
const profile = 2;

export function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="post-login" component={PostLogin} />
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="interests" component={Interests} />
      <HomeStack.Screen name="map" component={Map} />
      <HomeStack.Screen name="order" component={Order} />
      <HomeStack.Screen name="details" component={Details} />
      <HomeStack.Screen name="search" component={Search} />
      <HomeStack.Screen name="login" component={SignIn} />
    </HomeStack.Navigator>
  );
}

export function OwnerHomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="map" component={OwnerMap} />
    </HomeStack.Navigator>
  );
}

export function MapStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="map" component={Map} />
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="interests" component={Interests} />
      <HomeStack.Screen name="order" component={Order} />
      <HomeStack.Screen name="details" component={Details} />
      <HomeStack.Screen name="post-login" component={PostLogin} />
      <HomeStack.Screen name="search" component={Search} />
      <HomeStack.Screen name="login" component={SignIn} />
    </HomeStack.Navigator>
  );
}

export function SearchStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="search" component={Search} />
      <HomeStack.Screen name="map" component={Map} />
      <HomeStack.Screen name="home" component={Home} />
      <HomeStack.Screen name="interests" component={Interests} />
      <HomeStack.Screen name="order" component={Order} />
      <HomeStack.Screen name="details" component={Details} />
      <HomeStack.Screen name="post-login" component={PostLogin} />
      <HomeStack.Screen name="login" component={SignIn} />
    </HomeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

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
