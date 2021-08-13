import React from "react";
import { StyleSheet, View } from "react-native";
import {Subheading,Text, Card, Title, Paragraph } from "react-native-paper";




export default function History({ navigation }){


    return (


        <View style={styles.container}>
          <Title style={{paddingTop:250}}>Alert History</Title>
          <Card style={{marginBottom:20}} >
            
            <Card.Content>
              <Title>1/11/2021 5pm est</Title>
              <Paragraph>AAPL - formed bullish engulfing pattern</Paragraph>
              <Paragraph>BYND - formed bearish engulfing pattern</Paragraph>
            </Card.Content>
            
            
          </Card>

          <Card style={{paddingTop:30}} >
            
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
      flex:0.3,
      justifyContent: "center",
      alignItems: "center",
      
    }
  });