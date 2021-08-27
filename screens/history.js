import React, {useState, useEffect} from "react";
import { StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView, Image } from "react-native";
import {Button,Text, Card, Title, Paragraph } from "react-native-paper";
import { Picker as SelectPicker} from '@react-native-picker/picker';
import { useIsFocused } from '@react-navigation/native';
import StorageDataService from "../services/StorageDataService";
import StockService from "../services/StockService";

export default function History(){
 
  const [selectedStock, setSelectedStock] = useState("Choose Stock");
  const [watchlist, setWatchlist] = useState(null);
  const [alerts, setAlerts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isFocused = useIsFocused();

  function getSource(candle){
    

    switch (candle) {
      case "Bullish Engulfing":
        return require("../assets/bullish_engulfing.png");
      case "Bearish Engulfing":
        return require("../assets/bearish_engulfing.png");
      case "Morning Star":
        return require("../assets/morning_star.png");
      case "Evening Star":
        return require("../assets/evening_star.png");
    }
  }
 
  
const candleTypes = ['Bullish Engulfing', 'Bearish Engulfing', 'Morning Star', 'Evening Star'];
 
  useEffect(() => {
    async function fetchWatchlist(){
        try{
            
            const req = await StorageDataService.getUserWatchlist();
            const watchlistData = req;
            //console.log(watchlistData);
            setWatchlist(watchlistData);
           }catch(error){
               console.log(error);
           }
    }
    fetchWatchlist();
    },[isFocused])
 
    const handleScanStock = async () => {
          //get candle history from backend
          setIsLoading(true);
          try{
          const user = await AsyncStorage.getItem('username');
          const req = await StockService.getScanStockCandleResult(selectedStock, user);
          console.log(req.data);
          setIsLoading(() => {
            setAlerts(req.data);
            return false;
          });
        }catch(error){
          console.log(error)
        }finally{
          if(isLoading)
            setIsLoading(false);
        }
    }
  

  return (
    
    <View style={styles.container}>
      {/* <Title style={{alignSelf:'center',marginTop:20}}>Alert History</Title> */}
      <View style={{backgroundColor: 'white',marginHorizontal:80,marginTop:20,flexDirection: 'row'}}>        
        <SelectPicker style={{flex:3, marginLeft:10,marginRight: -10, marginBottom:-5}} mode='dropdown' dropdownIconColor='black' dropdownIconRippleColor='black'
          selectedValue={selectedStock}
          itemStyle={{backgroundColor: 'white'}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedStock(itemValue)}>
            {watchlist && watchlist.map((x,index) => (<SelectPicker.Item key={index} label={x.stockticker.toUpperCase()} value={x.stockticker} />))}
        </SelectPicker>
      
      
          <Button
            style={{flex:1,alignSelf:'center'}}
            color="#1e3a8a" 
            icon="chart-bar" 
            mode="contained" 
            onPress={handleScanStock}>
            SCAN
          </Button>
    </View>
    
      
      <View style={{flexDirection: "row", alignItems: 'center', justifyContent: 'space-between', borderBottomColor: 'lightgray', borderBottomWidth: 1, marginTop: 20, marginLeft: 12, marginRight: 12}}/>
      <ScrollView><View>
      {isLoading ? <ActivityIndicator marginTop={20} size='large' color="#0000ff"/> : <View>
        {alerts ? alerts.map((x,index) => (
            <Card key={index} style={{marginTop:12, marginHorizontal:10}}>
            <Card.Content>
            <Title style={{fontSize:15}}>{x.stockticker + ' on ' + x.datetime}</Title>
            {x.candle === candleTypes[0] ? <Paragraph>
                    <Paragraph style={{color: "green"}}>Bullish </Paragraph>Engulfing Pattern appeared!</Paragraph> : 
                    (x.candle === candleTypes[1] ? 
                    <Paragraph>
                    <Paragraph style={{color: "red"}}>Bearish </Paragraph>Engulfing Pattern appeared!</Paragraph> : 
                        (x.candle === candleTypes[2] ? 
                        <Paragraph>
                        <Paragraph style={{color: "green"}}>Bullish </Paragraph>Morning Star Pattern appeared!</Paragraph> : 
                        <Paragraph>
                        <Paragraph style={{color: "red"}}>Bearish </Paragraph>Evening Star Pattern appeared!</Paragraph>
                        )
                    )
                    }
            <Image style={styles.image} source={getSource(x.candle)}/> 
            </Card.Content></Card>
        ))
        
         : 
    <View style={{marginTop: 20, padding: 8, marginLeft: 'auto', marginRight: 'auto'}}><Text>No candles or settings are disabled!</Text></View>
  }
  </View>}</View></ScrollView>
</View>
);

}

const styles = StyleSheet.create({
container: {
  flex:1,
},
image: {
  width: 60,
  height: 50,
  alignSelf:'flex-end',
  marginTop:-50,
},


}
); 
