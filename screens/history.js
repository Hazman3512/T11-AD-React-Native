import React from "react";
import { StyleSheet, View } from "react-native";
import {Subheading,Text, Card, Title, Paragraph } from "react-native-paper";




export default function History({ navigation }){


    return (


        <View style={styles.container}>
          <Title style={{paddingBottom:20}}>Alert History</Title>
          <Card style={{marginBottom:20, flex:0.4}} >
            
            <Card.Content>
              <Title>1/11/2021 5pm est</Title>
              <Paragraph>AAPL - formed bullish engulfing pattern</Paragraph>
              <Paragraph>BYND - formed bearish engulfing pattern</Paragraph>
            </Card.Content>
            
            
          </Card>

          <Card style={{paddingTop:30,flex:0.4}} >
            
            <Card.Content>
              <Title>1/15/2021 6pm est</Title>
              <Paragraph>AAPL - formed bullish engulfing pattern</Paragraph>
              <Paragraph>BYND - formed bearish engulfing pattern</Paragraph>
            </Card.Content>
            
            
          </Card>
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'white',
      flex:1,
      justifyContent: "center",
      alignItems: "center",
      
    }
  });