import React from 'react';
import { useState, useEffect } from 'react'
import { FlatList } from 'react-native';
import { ScrollView } from 'react-native';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
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
        {stockInfo.stockTicker ? 
        [
        <View style = {styles.container}>
          <Text style={stockInfo.dataSource}>Data from Yahoo Finance</Text>
          <Text style = {styles.stockTicker}>{stockInfo.stockTicker}</Text>
          <Text>{stockInfo.companyName}</Text>
          <Text style={styles.initialPrice}>{(stockInfo.initialPrice).toFixed(2)}</Text>
          <Text></Text>
          <Text style = {styles.sentiment}>Sentiment: 
            <Text style = {styles.sentimentInner}> {stockInfo.sentiment}</Text> 
          </Text>
          </View>,

          <Button
          icon="eye" mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}>
          Add to Watchlist
        </Button>,

        <Button
        mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}>
        Show Comments
        </Button>
        
        // <Button
        //   color="#1e3a8a" 
        //   mode="text" 
        //   style={{marginTop:20}}
        //   // onPress={() => navigation.navigate('Comments')}
        //   >Comments
        // </Button>
        ]
          : <View></View>
          }

          
      </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: "flex-start",
    },
    dataSource: {
      fontSize: 10,
      color: "gray"
    },
    stockTicker: {
      fontSize: 35,
      fontWeight: "bold"
    },
    initialPrice: {
      fontSize: 20
    },
    sentiment: {
      fontSize: 20
    },
    sentimentInner: {
      textTransform: 'uppercase'
    },
    sentimentPositive: {
      color: "green"
    },
    sentimentNeutral: {
      color: "gray"
    },
    sentimentNegative: {
      color: "red"
    },
    Btn: {
      marginTop: 20,
      marginHorizontal:10,
      textTransform: "none"
    }
});