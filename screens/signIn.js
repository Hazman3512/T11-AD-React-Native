import React, {useState} from 'react';
import {   StyleSheet, TouchableOpacity, View } from 'react-native';
import { Title,Text, Button, TextInput } from 'react-native-paper';
import { AuthContext } from "../context";
import UserService from "../services/UserService";
import { Avatar } from "react-native-elements";


export default function SignIn({ navigation }){
    
    const { signIn } = React.useContext(AuthContext);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isSuccess, setIsSuccess] = React.useState(true);

    //Authentication code
    const loginSuccessOrFail=(response)=>{
        if(response.status == 200){
          //SessionService.setSessionStorage('username', userName);
          navigation.navigate('MainTabScreen', {screen: 'Search'});
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
        const req = await UserService.authenticateUser(loginuser);
        loginSuccessOrFail(req);
        
      }
    
    return(
        
            <View style={styles.container}>

                <Avatar
                size="medium"
                rounded
                icon={{name: 'lock', type: 'material-icons-outlined'}}
                activeOpacity={0.7}
                overlayContainerStyle={{backgroundColor: "#1bbd7e"}}
                containerStyle={{alignSelf:'center', marginTop: 50,textAlign: 'center'}}
                />

                <Title style={{alignSelf:'center',marginTop:20}}>Sign In</Title>
                
                <TextInput style={{marginTop:50,paddingHorizontal:10}}
                    label="Username"
                    value={username}
                    mode='outlined'
                    onChangeText={username => setUsername(username)}
                />

                <TextInput style={{marginTop:20, paddingHorizontal:10}}
                    label="Password"
                    value={password}
                    mode='outlined'
                    onChangeText={password => setPassword(password)}
                    secureTextEntry={true}
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