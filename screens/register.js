import React, {useState} from 'react';
import {   StyleSheet, TouchableOpacity, View } from 'react-native';
import {List , Menu, Divider,Provider, Text, Button, TextInput } from 'react-native-paper';
import { AuthContext } from "../context";
import DropDown from "react-native-paper-dropdown";
import UserService from "../services/UserService";


export default function Register({navigation}){

    
    const { register } = React.useContext(AuthContext);
    const [registration,setregistration]=useState(false);
    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    //to put handleSubmit in onPress for Register button
    // const handleSubmit = () => {
    //     const newuser = {username:username,password:password,email:email};
    //     console.log(JSON.stringify(newuser));
    //     UserService.addUser(newuser).then(res=>(registerSuccessOrFail(res)))
    // };

    // const registerSuccessOrFail=(response)=>{
    //     if(response.status===200){
    //       setregister(true);
    //       navigation.navigate("Home");
    //     }
    //     else{
    //       console.log(response.status);
          
    //     }
    //     return;
    //   };


    return (
        <Provider>

            <View style={styles.container}>

                <TextInput style={{marginTop:50,paddingHorizontal:10}}
                    label="Username"
                    value={username}
                    mode='outlined'
                    onChangeText={username => setUsername(username)}
                />

                <TextInput style={{marginTop:20,paddingHorizontal:10}}
                    label="Password"
                    mode='outlined'
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />
                
                <TextInput style={{marginTop:20,paddingHorizontal:10}}
                    label="E-mail"
                    value={email}
                    mode='outlined'
                    onChangeText={email => setEmail(email)}
                />

                
        
                

                

                <TouchableOpacity onPress={() => console.log("clicked")}>
                <Button style={{marginTop:40,marginHorizontal:10}}
                    
                    mode="contained"
                    color="#1e3a8a"
                    onPress={() => {register()}} 

                >Register
                </Button>  

                </TouchableOpacity>

                 <Text style={styles.register}>Already have an account? </Text>
                 <TouchableOpacity>
                 <Button
                    color="#1e3a8a"
                    mode="text" 
                    style={{marginTop:20}}
                    onPress={() => navigation.navigate('Sign In')}
                    >Login here</Button>
                 </TouchableOpacity>     
                
            </View>
        </Provider>



    )


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