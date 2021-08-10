import React from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import {Header, Card, ListItem, Button, Icon } from 'react-native-elements';
import { AuthContext } from "../context";



export default function Home({ navigation, route }){

    const { signOut } = React.useContext(AuthContext);

   
    return(
        <View style={{flex:1, alignItems: 'center', justifyContent:'center'}}>
            
            
            <Card>
                <Card.Title>Your Profile</Card.Title>
                <Card.Divider/>
                <Card.Image source={require('../assets/catprofile.jpg')}>
                    
                </Card.Image>

                <Text style={{marginBottom: 100}}>
                    Welcome back, Professor X. You have 0 unread messages.
                    </Text>
            </Card>

            <TouchableOpacity>
                <Button

                    title="Log out"
                    onPress={() => {signOut()}} 

                />  

            </TouchableOpacity>


            
            

            

            
            
            
        </View>
    );
   
}






const styles = StyleSheet.create({
    // container:{
    //     padding: 24,
    //     justifyContent: 'center',
    // },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
    }
})