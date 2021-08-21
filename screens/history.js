import React, {useState} from "react";
import {TouchableOpacity, StyleSheet, View } from "react-native";
import {Button,Subheading,Text, Card, Title, Paragraph } from "react-native-paper";
import { Picker as SelectPicker} from '@react-native-picker/picker';



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


          
          <Button
            style={{marginTop:440,marginHorizontal:70}} 
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
      backgroundColor:'white',
      flex:1,
      
      
    }
  });