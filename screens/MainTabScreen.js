import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from "../context";
import CustomNavigationBar from './layout/CustomNavigationBar';
import Search from './search';
import WatchList from './watchList';
import History from './history';
import StorageDataService from '../services/StorageDataService';

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
                name="Search"
                component={Search}
                options={{
                header: CustomNavigationBar,
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
                    <MaterialCommunityIcons onPress={async ()=>navigation.navigate('Watchlist', await StorageDataService.getUserWatchlist())} 
                    name="view-list" color={color} size={26} />
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