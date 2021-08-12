import React from 'react';
import {   StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Button, TextInput } from 'react-native-paper';
import { AuthContext } from "../context";

export default function SignIn({ navigation }){
    
    const { signIn } = React.useContext(AuthContext);
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    
    return(
            <View style={styles.container}>
                
                <TextInput style={{marginTop:20}}
                    label="E-mail"
                    value={email}
                    onChangeText={email => setEmail(email)}
                />

                <TextInput style={{marginTop:20}}
                    label="Password"
                    value={password}
                    onChangeText={password => setPassword(password)}
                    secureTextEntry
                    right={<TextInput.Icon name="eye" />}
                />

                <TouchableOpacity onPress={() => console.log("clicked")}>
                <Button style={{marginTop:20}}
                    
                    mode="contained"
                    color="white"
                    onPress={() => {signIn()}} 

                >Login
                </Button>  

                </TouchableOpacity>

                 <Text style={styles.register}>Don't have an account yet? </Text>
                 <TouchableOpacity>
                 <Button 
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
    },
    register:{
        textAlign: 'center',
        marginTop:20,   
        
    },
    
})