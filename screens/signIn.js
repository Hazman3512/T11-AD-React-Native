import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {   TouchableOpacity, View } from 'react-native';
import { Button,Input } from 'react-native-elements';
import { AuthContext } from "../context";

export default function SignIn({ navigation }){
    
    const { signIn } = React.useContext(AuthContext);
    
    return(
            <View>
                
                <Input
                placeholder='E-mail address'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                />

                <Input
                placeholder='Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                />

                <TouchableOpacity onPress={() => console.log("clicked")}>
                <Button

                    title="Login"
                    onPress={() => {signIn()}} 

                />  

                </TouchableOpacity>
                
            </View>




    );



}