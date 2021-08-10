import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Home from './screens/home';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Search from './screens/search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryDetails from './screens/historyDetails';
import { FontAwesome } from '@expo/vector-icons'; 
import WatchList from './screens/watchList';
import SignIn from './screens/signIn';
import { AuthContext } from "./context";
import { createStackNavigator } from '@react-navigation/stack';
import MainTabScreen from './screens/MainTabScreen';
import { useEffect } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { Image, StyleSheet, View, Text } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import { color } from 'react-native-elements/dist/helpers';




const Stack = createStackNavigator();








export default function App() {


  const [isLoading, setIsLoading] = React.useState(true);
  const [ userToken, setUserToken] = React.useState(null);
  
  
  const authContext = React.useMemo(() => ({

    signIn: () => {
      setUserToken('123')
      setIsLoading(false);
    },

    signOut: () => {
      setUserToken(null);
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
          <Stack.Navigator>
            
            <Stack.Screen 
              name="Overview"  
              component={MainTabScreen}
              options={{
                title: 'Home',
                headerTitleStyle: {
                  alignItems: 'center',
                },
              }}

                
            />
          </Stack.Navigator>
          )
        :
        <Stack.Navigator>
        <Stack.Screen 
          name="Sign In" 
          component={SignIn} />
        </Stack.Navigator>
          }
        </NavigationContainer>
        </AuthContext.Provider>
      
          );
  

}