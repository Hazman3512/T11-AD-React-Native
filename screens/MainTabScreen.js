import React, {useState} from "react";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CustomNavigationBar from "./layout/CustomNavigationBar";
import Search from "./search";
import WatchList from "./watchList";
import History from "./history";
import StorageDataService from "../services/StorageDataService";

const Tab = createMaterialTopTabNavigator();

export default function MainTabScreen({ navigation }) {

  const [swipeEnabled, setSwipeEnabled] = React.useState(false);
  return (
    <Tab.Navigator
      tabBarPosition='bottom'
      screenOptions={{
      tabBarActiveTintColor: 'black',
      tabBarStyle:{ height:60,backgroundColor: "white" },
      tabBarPosition: 'bottom',
      tabBarLabelStyle: { fontSize: 10 },
      
    }}
    >
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          header: CustomNavigationBar,
          tabBarLabel: "Search",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={20} />
          ),
        }}
      />
      <Tab.Screen
        name="WatchList"
        component={WatchList}
        options={{
          swipeEnabled: false,
          tabBarLabel: "Watchlist",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              onPress={async () =>
                navigation.navigate(
                  "Watchlist",
                  await StorageDataService.getUserWatchlist()
                )
              }
              name="view-list"
              color={color}
              size={20}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="refresh-circle"
              color={color}
              size={20}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
