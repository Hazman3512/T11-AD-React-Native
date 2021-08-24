import React, {useState} from "react";
import {TouchableOpacity, StyleSheet, View } from "react-native";
import {Button,Subheading,Text, Card, Title, Paragraph } from "react-native-paper";
import { Picker as SelectPicker} from '@react-native-picker/picker';



export default function Settings({ navigation }){

  


    return (


        <View style={styles.container}>
          <Title style={{alignSelf:'center',marginTop:20}}>Settings</Title>
         

            <Text>Put all settings here</Text>
          
          
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      flex:1,
      
      
    }
  });