import "react-native-gesture-handler";
import React, { useState } from "react";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import SignIn from "./screens/signIn";
import { AuthContext } from "./context";
import { createStackNavigator } from "@react-navigation/stack";
import MainTabScreen from "./screens/MainTabScreen";
import Comments from "./screens/comments";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { Image, StyleSheet, View, Text } from "react-native";
import CustomNavigationBar from "./screens/layout/CustomNavigationBar";
import Register from "./screens/register";
import Settings from "./screens/settings";
import Stockchart from "./screens/stockchart";
import StockChartNavigationBar from "./screens/layout/StockChartNavigationBar";
import WatchList from "./screens/watchList";

export default function App() {
  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = React.useState(true);
  const [userToken, setUserToken] = React.useState(null);

  const authContext = React.useMemo(() => ({
    signIn: () => {
      setUserToken("123");
      setIsLoading(false);
    },

    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    register: () => {
      setUserToken("123");
      setIsLoading(false);
    },
  }));

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {userToken !== null ? (
          <Stack.Navigator
            screenOptions={{
              header: CustomNavigationBar,
            }}
          >
            <Stack.Screen name="Overview" component={MainTabScreen} />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MainTabScreen"
              component={MainTabScreen}
              options={{
                header: CustomNavigationBar,
              }}
            />
            <Stack.Screen
              name="Comments"
              component={Comments}
              options={{
                header: CustomNavigationBar,
              }}
            />
            <Stack.Screen
              name="Stockchart"
              component={Stockchart}
              options={{
                header: StockChartNavigationBar,
              }}
            />
            <Stack.Screen
              name="Settings"
              component={Settings}
              options={{
                header: CustomNavigationBar,
              }}
            />
            <Stack.Screen
              name="watchList"
              component={WatchList}
              options={{
                header: CustomNavigationBar,
              }}
            />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
