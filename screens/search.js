import React from 'react';
import { useState, useEffect } from 'react'
//import { FlatList } from 'react-native';
import { ScrollView, ActivityIndicator, ToastAndroid, AsyncStorage, Image } from 'react-native';
import { ImageBackground } from 'react-native';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import { Button, Searchbar, Text } from 'react-native-paper';
import ChartService from '../services/ChartService';
import StorageDataService from '../services/StorageDataService';
import WatchlistService from '../services/WatchlistService';
import { useIsFocused } from '@react-navigation/native';


export default function Search({navigation, route}) {


  const [searchQuery, setSearchQuery] = useState('');
  //const [searchTimer, setSearchTimer] = useState(null);

  const onChangeSearch = query => setSearchQuery(query);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInWatchList, setIsInWatchList] = useState(false);
  const isFocused = useIsFocused();

  const [stockInfo, setStockInfo] = useState({
    stockTicker: null,
    companyName: null,
    initialPrice: null,
    sentiment: null
  });

  async function getInitialPrice(ticker) {

    setIsLoading(true);
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

      // Comment out the following if calling from API
      // stockTicker: "AAPL",
      // companyName: "Apple",
      // initialPrice: 149.9999,
      // sentiment: "negative"
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

  useEffect(() => {
    async function isTickerInWatchList() {
      if (await StorageDataService.checkIsStockWatched(stockInfo.stockTicker)) {
        setIsInWatchList(true);
      }
      else {
        setIsInWatchList(false);
      }
    }
    isTickerInWatchList();
  }, [isFocused])


  const handleAddWatchlist = async () => {
    
      ToastAndroid.showWithGravity('Stock added to watchlist!', ToastAndroid.LONG, ToastAndroid.CENTER);
      //add to storage 
      await StorageDataService.addStockToWatchlist(stockInfo.stockTicker, stockInfo.companyName);
      console.log(await StorageDataService.getUserWatchlist());
      //add to database
      const user = await AsyncStorage.getItem("username");
      await WatchlistService.addStockWatchlist(stockInfo.stockTicker,user, stockInfo.companyName);
      console.log(await WatchlistService.getStockWatchlist());
      //modify for button
      setIsInWatchList(true);
    
  }

  const handleShowComment = async() => {
  
    const user = await AsyncStorage.getItem('username');

    navigation.navigate('Comments', {
    ticker: stockInfo.stockTicker,
    user: user,
    });
  
    

  }

  const handleViewChart = async () => {
    navigation.navigate('Stockchart', {
      ticker: stockInfo.stockTicker,
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
          <Text style = {styles.stockTicker}>{stockInfo.stockTicker.toUpperCase()}</Text>
          <Text style={styles.initialPrice}>{(stockInfo.initialPrice).toFixed(2)}</Text>
          <Text style = {styles.sentiment}>Sentiment: 
          {stockInfo.sentiment.toLowerCase() === "positive" ? <Text style={styles.sentimentPositive}> {stockInfo.sentiment}</Text> : (stockInfo.sentiment.toLowerCase() === "negative" ? <Text style={styles.sentimentNegative}> {stockInfo.sentiment}</Text> : <Text styles={styles.sentimentNeutral}> {stockInfo.sentiment}</Text>)}
          </Text>
          </View>,

        <View style={{height: 220, marginTop: 20}} key="chart">
          <TouchableOpacity
            onPress={handleViewChart}
          >
            <ImageBackground style={styles.image} source={require("../assets/blurred_chart.png")} resizeMode="contain">
              <View style={styles.img_view}> 
              <Button icon="chart-areaspline-variant" mode="contained" size="small" style={styles.img_btn} labelStyle={styles.img_label}>
                View Live Chart</Button>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>,
        
        <View key = "watchlist">
          {isInWatchList ? 
          <Button icon="eye" mode="contained" disabled color="#1e3a8a" size = "small" style={styles.Btn}> Already in watchlist</Button> : 
          <Button onPress={handleAddWatchlist} 
          icon="eye" mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}> Add to watchlist </Button>}
        </View>,

        <Button key="Comments"
        icon="comment-multiple" mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}
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
    sentimentPositive: {
      textTransform: 'uppercase',
      color: "green"
    },
    sentimentNeutral: {
      textTransform: 'uppercase',
      color: "gray"
    },
    sentimentNegative: {
      textTransform: 'uppercase',
      color: "red"
    },
    Btn: {
      marginTop: 20,
      marginHorizontal:10,
      textTransform: "none"
    },
    image: {
      marginTop: 20,
      marginHorizontal: 10,
      width: 370,
      height: 200
    },
    img_view: {
      position: 'absolute', 
      top: 0, 
      left: 0, 
      right: 0, 
      bottom: 0, 
      justifyContent: 'center', 
      alignItems: 'center',
    },
    img_btn: {
      backgroundColor: "#8c8c8c",
      padding: 5,
      color: "black",
    },
    img_label: {
      color:"white"
    }
});