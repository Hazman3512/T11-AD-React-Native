import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Home from './screens/home';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './screens/search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons'; 
import WatchList from './screens/watchList';
import SignIn from './screens/signIn';
import { AuthContext } from "./context";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './screens/MainTabScreen';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Image, StyleSheet, View, Text } from 'react-native';
import CustomNavigationBar from './screens/layout/CustomNavigationBar';
import Register from './screens/register';







export default function App() {

  const Stack = createStackNavigator();
  const [isLoading, setIsLoading] = React.useState(true);
  const [ userToken, setUserToken] = React.useState(null);
  
  
  const authContext = React.useMemo(() => ({

    signIn: () => {
      setUserToken('123');
      setIsLoading(false);
    },

    signOut: () => {
      setUserToken(null);
      setIsLoading(false);
    },
    register: () => {
      setUserToken('123');
      setIsLoading(false);
    },
  }));
  
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    },1000);
  }, []);

  if ( isLoading ){

    return(
      <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
      </View>
    );


  }

 
 
    return (
        <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          
          { userToken !== null ? (
          <Stack.Navigator
          screenOptions={{
            header: CustomNavigationBar,
          }}>
            
            <Stack.Screen 
              name="Overview"  
              component={MainTabScreen}

                
            />
            <Stack.Screen 
          name="Sign In" 
          component={SignIn} />
          </Stack.Navigator>
          )
        :
        <Stack.Navigator>
        <Stack.Screen 
          name="Sign In" 
          component={SignIn}
          options={{
            
            headerTitleStyle:{
              alignSelf:'center'
            },
          }} />
        <Stack.Screen 
          name="Register" 
          component={Register} />
        <Stack.Screen 
          name="MainTabScreen" 
          component={MainTabScreen}
          options={{
            header : CustomNavigationBar
           }} />
        </Stack.Navigator>
          }
        </NavigationContainer>
        </AuthContext.Provider>
      
          );
  

}