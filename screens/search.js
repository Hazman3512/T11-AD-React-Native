import React from 'react';
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button, Searchbar } from 'react-native-paper';
import ChartService from '../services/ChartService';


export default function Search({navigation, route}) {


  const [searchQuery, setSearchQuery] = useState('');
  const [searchTimer, setSearchTimer] = useState(null);

  const onChangeSearch = query => setSearchQuery(query);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const [stockInfo, setStockInfo] = useState({
    stockTicker: null,
    companyName: null,
    initialPrice: null,
    sentiment: null
  });

  async function getInitialPrice(ticker) {

    const req = await ChartService.getLatestClosingStockPrice(ticker);
    const sentimentReq = await ChartService.getLatestStockSentiment(ticker);
    const latestPrice = parseFloat(req.data.close);
    const company = req.data.description;
    const sentimentData = sentimentReq.data;

    setIsLoading(() => {
      setStockInfo({
      stockTicker: ticker,
      companyName: company,
      initialPrice: latestPrice,
      sentiment: sentimentData
  });
  return false;});

  }


    return (
      <ScrollView>
        <View style={styles.container} >
        <Searchbar
        style={{borderRadius:5}}
        placeholder="Search Stocks"
        onChangeText={(text) => {
          if (searchTimer) {
            clearTimeout(searchTimer);
          }
          setSearchQuery(text);
          setSearchTimer(
            setTimeout(() => {
              getInitialPrice(text);
            }, 2000),
          );
        }}
        value={searchQuery}
        onIconPress={()=> console.log({searchQuery})}
        />
        </View>
        <View style = {styles.container}>
          <Text>{stockInfo.stockTicker}</Text>
          <Text>{stockInfo.companyName}</Text>
          <Text>{stockInfo.initialPrice}</Text>
          <Text>Sentiment: {stockInfo.sentiment}</Text> 
          </View>
      </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 6,
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "flex-start",
    },
});