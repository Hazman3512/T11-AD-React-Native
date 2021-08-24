import React from 'react';
import { Appbar } from 'react-native-paper';
import { AuthContext } from '../../context';
import SignIn from '../signIn';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

function CustomNavigationBar({ navigation, route, previous }) {

    const routeName = getFocusedRouteNameFromRoute(route);
    const { signOut } = React.useContext(AuthContext);
    //const navigation = useNavigation();
    
    const handleLogout = async () => {
      try{
      //console.log(AsyncStorage.getItem('username'));
        
       AsyncStorage.clear();
      //console.log(await AsyncStorage.getItem('username'));
      navigation.navigate('SignIn');
      }catch(e){
        console.log('Error Page');
      }
    }

    return (
      <Appbar.Header style={{
          backgroundColor: "white"}}> 
        {previous ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
        <Appbar.Content title={routeName}></Appbar.Content>
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>
    );
  }


export default CustomNavigationBar;