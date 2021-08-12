import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../context";

import Home from './home';
import Search from './search';
import WatchList from './watchList';
import History from './history';

const Tab = createMaterialBottomTabNavigator();





export default function MainTabScreen ({ navigation }) {

    const { signOut } = React.useContext(AuthContext);
   
    return(
        <Tab.Navigator
            //initialRouteName="Home"
            activeColor="black"
            barStyle={{ backgroundColor: 'white' }}
    >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{
                        
                        headerRight: () => (
                          <Text
                            onPress={() => {signOut()}}
                            title="Log out" />
                        ),
                tabBarLabel: 'Home',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="home" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Search"
                component={Search}
                options={{
                tabBarLabel: 'Search',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="magnify" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="Watchlist"
                component={WatchList}
                options={{
                tabBarLabel: 'Watchlist',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="view-list" color={color} size={26} />
                ),
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                tabBarLabel: 'History',
                tabBarIcon: ({ color }) => (
                    <MaterialCommunityIcons name="refresh-circle" color={color} size={26} />
                ),
                }}
            />
        </Tab.Navigator>




    );

}