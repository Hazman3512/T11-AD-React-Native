import React from "react";
import {TouchableOpacity, StyleSheet, View } from "react-native";
import {Button,Subheading,Text, Card, Title, Paragraph } from "react-native-paper";




export default function History({ navigation }){


    return (


        <View style={styles.container}>
          <Title style={{alignSelf:'center',marginTop:20}}>Alert History</Title>
          <TouchableOpacity>
          <Button
            style={{marginTop:40,marginHorizontal:70}} 
            color="#1e3a8a" 
            icon="chart-bar" 
            mode="contained" 
            onPress={() => console.log('Pressed')}>
            SCAN
          </Button>
          </TouchableOpacity>
          
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      flex:1,
      
      
    }
  });