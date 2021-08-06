import 'react-native-gesture-handler';
import React, { useState } from 'react';
import Home from './screens/home';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from './screens/search';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HistoryDetails from './screens/historyDetails';
import { FontAwesome } from '@expo/vector-icons'; 
import WatchList from './screens/watchList';



const getFonts = () => Font.loadAsync({
  'nunito-regular': require('./assets/fonts/Nunito-Regular.ttf'),
  'nunito-bold': require('./assets/fonts/Nunito-Bold.ttf'),
});

Stack = createStackNavigator();
const Tab = createBottomTabNavigator();





export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  
  
  

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Tab.Navigator
             screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
    
                if (route.name === 'Home') {
                  iconName = focused
                    ? 'ios-information-circle'
                    : 'ios-information-circle-outline';
                    return <FontAwesome name="home" size={24} color="black" />;
                } else if (route.name === 'Search') {
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                  return <FontAwesome name="search" size={24} color="black" />;

                }else if (route.name === 'Watchlist'){
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                  return <FontAwesome name="th-list" size={24} color="black" />;

                }else{
                  iconName = focused ? 'ios-list-box' : 'ios-list';
                  return <FontAwesome name="history" size={24} color="black" />;

                }
    
                // You can return any component that you like here!
               
                
                 
              },
              tabBarActiveTintColor: 'black',
              tabBarInactiveTintColor: 'gray',
            })}
      
        >
          <Tab.Screen name="Home" component={Home}/>
          <Tab.Screen name="Search" component={Search}/>
          <Tab.Screen name="Watchlist" component={WatchList}/>
          <Tab.Screen name="History" component={HistoryDetails}/>
        </Tab.Navigator>

      </NavigationContainer>
      
    );
  } else {
    return (
      <AppLoading 
        startAsync={getFonts} 
        onError={() => console.log('error')}
        onFinish={() => setFontsLoaded(true)} 
      />
    )
  }

}