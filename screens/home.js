import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';



export default function Home({ navigation }){

    

   
    return(
        <View style={styles.container}>
             <Image source={{uri: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"}} style={{ width: 305, height: 159 }} /> 

            <Text h3>Welcome back, Professor_X</Text>

            <Text h4>You have 0 unread alerts since you last logged in</Text>

            
            
            
        </View>
    );
   
}






const styles = StyleSheet.create({
    container:{
        padding: 24,
        justifyContent: 'center',
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
    }
})