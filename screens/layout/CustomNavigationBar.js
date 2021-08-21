import React from 'react';
import { Appbar } from 'react-native-paper';
import { AuthContext } from '../../context';
import SignIn from '../signIn';
import { useNavigation } from '@react-navigation/native';
import { AsyncStorage } from 'react-native';

function CustomNavigationBar({ navigation }) {
    const { signOut } = React.useContext(AuthContext);
    //const navigation = useNavigation();
    
    const handleLogout = async () => {
      
      //console.log(await AsyncStorage.getItem('username'));
      await AsyncStorage.clear();
      //console.log(await AsyncStorage.getItem('username'));
      navigation.navigate('SignIn')
    }

    return (
      <Appbar.Header style={{
          backgroundColor: "white"}}> 
        <Appbar.Content title="Overview" />
        <Appbar.Action icon="logout" onPress={handleLogout} />
      </Appbar.Header>
    );
  }


export default CustomNavigationBar;