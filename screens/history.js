import React, {useState, useEffect} from "react";
import { StyleSheet, View, AsyncStorage, ActivityIndicator, ScrollView } from "react-native";
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
    fetchWatchlist()},[isFocused])
 
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
      <View style={{marginHorizontal:24,marginTop:20, flexDirection: 'row'}}>     
        <SelectPicker style={{flex:3, marginRight: 16}} mode='dropdown' backgroundColor='white'
        selectedValue={selectedStock}
        itemStyle={{backgroundColor: 'white'}}
        onValueChange={(itemValue, itemIndex) =>
          setSelectedStock(itemValue)}>
          {watchlist && watchlist.map((x,index) => (<SelectPicker.Item key={index} label={x.stockticker} value={x.stockticker} />))}
        </SelectPicker>
      <Button
        style={{flex:1}} 
        color="#1e3a8a" 
        icon="chart-bar" 
        mode="contained" 
        onPress={handleScanStock}>
        SCAN
      </Button>
      </View>
      
      <View style={{borderBottomColor: 'lightgray', borderBottomWidth: 1, marginTop: 20, marginLeft: 12, marginRight: 12}}/>
      <ScrollView><View>
      {isLoading ? <ActivityIndicator marginTop={20} size='large' color="#0000ff"/> : <View>
        {alerts ? alerts.map((x,index) => (
            <Card key={index} style={{marginTop:12, marginHorizontal:10}}>
            <Card.Content>
            <Title>{x.stockticker + ' on ' + x.datetime}</Title>
            <Paragraph>{x.candle} Pattern has appeared</Paragraph>
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
}
}); 
