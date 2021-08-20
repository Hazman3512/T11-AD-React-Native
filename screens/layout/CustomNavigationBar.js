import React from 'react';
import { Appbar } from 'react-native-paper';
import { AuthContext } from '../../context';
import SignIn from '../signIn';

function CustomNavigationBar({ navigation, previous }) {
    const { signOut } = React.useContext(AuthContext);
    
    return (
      <Appbar.Header style={{
          backgroundColor: "white"}}
          >
          
        <Appbar.Content title="Overview" />
        <Appbar.Action icon="logout" onPress={() => navigation.navigate('Sign In')} />
      </Appbar.Header>
    );
  }


export default CustomNavigationBar;