import React, {useState} from 'react';
import {   StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { AuthContext } from "../context";
import { Input } from 'react-native-elements';
import UserService from "../services/UserService";
import { Formik } from 'formik';

export default function SignIn({ navigation }){
    
    const { signIn } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(true);

    //Authentication code
    const loginSuccessOrFail=(response)=>{
        console.log('asdf')
        if(response.status == 200){
            console.log('hi')
          //SessionService.setSessionStorage('username', userName);
          console.log(username);
          navigation.navigate('Register');
        }
        else{
          console.log(response.status);
          setIsSuccess(false);
        }
        return;
      };
    // function validateForm() {
    //     return username.length > 0 && password.length > 0;
    // }

const handleSubmit = async ()  => {
        //validateForm();
        const loginuser={username:username,password:password}
        console.log(loginuser);
        console.log("hello");
        const req = await UserService.authenticateUser(loginuser);
        console.log(req.data);
        loginSuccessOrFail(req);
        
      }
    
    return(
        
            <View style={styles.container}>
                
                <TextInput style={{marginTop:50,paddingHorizontal:10}}
                    label="Username"
                    value={username}
                    mode='outlined'
                    onChangeText={setUsername}
                />

                <TextInput style={{marginTop:20, paddingHorizontal:10}}
                    label="Password"
                    value={password}
                    mode='outlined'
                    onChangeText={setPassword}
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />

                <TouchableOpacity>
                <Button style={{marginTop:40,marginHorizontal:10}}
                    
                    mode="contained"
                    color="#1e3a8a"
                    onPress={handleSubmit} 

                >Login
                </Button>  

                </TouchableOpacity>

                 <Text style={styles.register}>Don't have an account yet? </Text>
                 <TouchableOpacity>
                 <Button
                    color="#1e3a8a" 
                    mode="text" 
                    style={{marginTop:20}}
                    onPress={() => navigation.navigate('Register')}
                    >Register here</Button>
                 </TouchableOpacity>     
                
            </View>
        



    );



}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    },
    register:{
        textAlign: 'center',
        marginTop:20,   
        
    },
    
})