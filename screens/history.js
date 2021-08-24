import React, {useState} from "react";
import {TouchableOpacity, StyleSheet, View } from "react-native";
import {Button,Subheading,Text, Card, Title, Paragraph } from "react-native-paper";
import { Picker as SelectPicker} from '@react-native-picker/picker';
import { ScrollView } from "react-native";



export default function History({ navigation }){

  const [selectedStock, setSelectedStock] = useState("Choose Stock");


    return (


        <View style={styles.container}>
          <Title style={{alignSelf:'center',marginTop:20}}>Alert History</Title>
          <SelectPicker
            style={{marginHorizontal:70,marginTop:20}}
            mode='dropdown'
            selectedValue={selectedStock}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedStock(itemValue)
            }>
            <SelectPicker.Item label="AAPL" value="apple" />
            <SelectPicker.Item label="GOOG" value="bynd" />
          </SelectPicker>
          <ScrollView>
          <Card style={{marginTop:20, marginHorizontal:10}}>
            
              <Card.Content>
                <Title>AAPL</Title>
                <Paragraph>Bullish Engulfing Pattern has appeared</Paragraph>
              </Card.Content>
            
          </Card>

          <Card style={{marginTop:20, marginHorizontal:10}}>
            
              <Card.Content>
                <Title>AAPL</Title>
                <Paragraph>Bullish Engulfing Pattern has appeared</Paragraph>
              </Card.Content>
            
          </Card>
          </ScrollView> 

          
          <Button
            style={{marginTop:120,marginHorizontal:70,marginBottom:10}} 
            color="#1e3a8a" 
            icon="chart-bar" 
            mode="contained" 
            onPress={() => console.log('Pressed')}>
            SCAN
          </Button>
          
          
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      flex:1,
      
      
    }
  });