import React from 'react';
import { Appbar } from 'react-native-paper';
import { AuthContext } from '../../context';
import SignIn from '../signIn';
import { useNavigation } from '@react-navigation/native';

function CustomNavigationBar({ navigation }) {
    const { signOut } = React.useContext(AuthContext);
    //const navigation = useNavigation();
    return (
      <Appbar.Header style={{
          backgroundColor: "white"}}
          >
          
        <Appbar.Content title="Overview" />
        <Appbar.Action icon="logout" onPress={() => navigation.navigate('SignIn')} />
      </Appbar.Header>
    );
  }


export default CustomNavigationBar;