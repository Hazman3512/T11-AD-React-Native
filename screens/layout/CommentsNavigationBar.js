import React from 'react';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';

function CommentsNavigationBar({ navigation }) {

  const handleLogout = async () => {
    try {
      
      AsyncStorage.clear();
      navigation.navigate("SignIn");
    } catch (e) {
      console.log("Error Page");
    }
  };

  return (
    <Appbar.Header
      style={{
        backgroundColor: "white",
      }}
    >
      <Appbar.Action icon="chevron-left" onPress={ () => {navigation.goBack() }}></Appbar.Action>  
      <Appbar.Content title="Comments"></Appbar.Content>
      <Appbar.Action icon="logout" onPress={handleLogout} />
    </Appbar.Header>
  );
}

export default CommentsNavigationBar;
