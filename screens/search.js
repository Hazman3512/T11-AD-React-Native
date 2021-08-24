import { Autorenew } from '@material-ui/icons';
import React from 'react';
import { useState, useEffect } from 'react'
//import { FlatList } from 'react-native';
import { ScrollView, ActivityIndicator, ToastAndroid, AsyncStorage } from 'react-native';
import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import { Button, Searchbar } from 'react-native-paper';
import ChartService from '../services/ChartService';
import StorageDataService from '../services/StorageDataService';


export default function Search({navigation, route}) {


  const [searchQuery, setSearchQuery] = useState('');
  //const [searchTimer, setSearchTimer] = useState(null);

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

    setIsLoading(true);
    // const req = await ChartService.getLatestClosingStockPrice(ticker);
    // const sentimentReq = await ChartService.getLatestStockSentiment(ticker);
    // const latestPrice = parseFloat(req.data.close);
    // const company = req.data.description;
    // const sentimentData = sentimentReq.data;

    setIsLoading(() => {
      setStockInfo({
      // stockTicker: ticker,
      // companyName: company,
      // initialPrice: latestPrice,
      // sentiment: sentimentData

      // Comment out the following if calling from API
      stockTicker: "AAPL",
      companyName: "Apple",
      initialPrice: 149.9999,
      sentiment: "neutral"
  });
  return false;});

  }

  const handleSearch = (text) => {
    if(text){
      setSearchQuery(() => {
        getInitialPrice(text);
        return text;
      })
    }
  }

  const handleAddWatchlist = async () => {
    if(await StorageDataService.checkIsStockWatched(stockInfo.stockTicker)){
      ToastAndroid.showWithGravity('Stock has already been in watchlist!', ToastAndroid.LONG, ToastAndroid.TOP);
      console.log(await StorageDataService.getUserWatchlist());
      }
    else{
      ToastAndroid.showWithGravity('Stock added to watchlist!', ToastAndroid.SHORT, ToastAndroid.TOP);
      //add to storage 
      await StorageDataService.addStockToWatchlist(stockInfo.stockTicker, stockInfo.companyName);
      console.log(await StorageDataService.getUserWatchlist());
      //add to database

    }
  }

  const handleShowComment = async() => {
  
    const user = await AsyncStorage.getItem('username');

    navigation.navigate('Comments', {
    ticker: stockInfo.stockTicker,
    user: user,
    });
  
    

  }


    return (
      <ScrollView>
        <View style={styles.container} >
        <Searchbar
        style={{borderRadius:5}}
        placeholder="Search Stocks"
        onChangeText={(text) =>setSearchQuery(text)}
        value={searchQuery}
        onIconPress={()=> handleSearch(searchQuery)}
        />
        </View>
        {isLoading ? <View style={styles.loading}><ActivityIndicator size='large' color="#0000ff"/></View> : <View>
        {stockInfo.stockTicker ? 
        [
        <View style = {styles.container} key="stockinfo">
          <Text>{stockInfo.companyName}</Text>
          <Text style = {styles.stockTicker}>{stockInfo.stockTicker}</Text>
          <Text style={styles.initialPrice}>{(stockInfo.initialPrice).toFixed(2)}</Text>
          <Text></Text>
          <Text style = {styles.sentiment}>Sentiment: 
            <Text style = {styles.sentimentInner}> {stockInfo.sentiment}</Text> 
          </Text>
          </View>,

        <View style={{height: 220, marginTop: 20}} key="chart"><Button icon='graph'
          >View Chart</Button></View>,

        <Button onPress={handleAddWatchlist} key="addToWatchlist"
          icon="eye" mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}>
          Add to Watchlist
        </Button>,

        <Button key="Comments"
        mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}
        onPress={handleShowComment}
        >
        Show Comments
        </Button>
        ]
          : <View style={styles.noSearchStock}><Text>There is no such stock symbol</Text></View>
          }
          </View>}
       
      </ScrollView>
    );

}

const styles = StyleSheet.create({
    noSearchStock: {
      marginTop: 40, marginLeft: 'auto', marginRight: 'auto'
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      marginTop: 40,
      marginBottom: 'auto'
    },
    container: {
        marginTop: 20,
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: "flex-start",
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