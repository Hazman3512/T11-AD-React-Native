import React from 'react';
import { useState, useEffect, useRef, useCallback } from 'react'
import { ScrollView, ActivityIndicator, ToastAndroid, AsyncStorage,  Dimensions } from 'react-native';
import { ImageBackground } from 'react-native';
import {View, StyleSheet} from 'react-native';
import { Button, Text } from 'react-native-paper';
import ChartService from '../services/ChartService';
import StorageDataService from '../services/StorageDataService';
import WatchlistService from '../services/WatchlistService';
import { useIsFocused } from '@react-navigation/native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


export default function Search({navigation, route}) {


  const [searchQuery, setSearchQuery] = useState('Search Stock');
  //const [searchTimer, setSearchTimer] = useState(null);

  const [loading, setLoading] = useState(false)
  const searchRef = useRef(null)
  const [suggestions, setSuggestions] = useState([
  {symbol: "AAPL", description: "APPLE INC"},
  {symbol: "MSFT", description: "MICROSOFT CORP"},
  {symbol: "GOOG", description: "ALPHABET INC-CL C"},
  {symbol: "AMZN", description: "AMAZON.COM INC"},
  {symbol: "FB", description: "FACEBOOK INC-CLASS A"}]);

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
    companyName: stockInfo.companyName,
    user: user,
    });
  
    

  }

  const handleViewChart = async () => {
    navigation.navigate('Stockchart', {
      ticker: stockInfo.stockTicker,
    });
  }

  const handleChangeInput = useCallback(async (input) => {
    //setSearchQuery(input);
    //get top 5 suggestions
    const req = await ChartService.getTop5Stock(input);
    //console.log(req.data);
    await setSuggestions(req.data);

},[])

const handleSuggestionClick = useCallback(async (item) => {
  try{
  console.log(item)
  await setSearchQuery(item.symbol);
  //send request to fetch data
  getInitialPrice(item.symbol);
  }
  catch(e){
    console.log(e);
  }
},[])




    return (
      <ScrollView>
        < View style={{marginTop: 8, width: '95%', height: 610, marginLeft: 10, marginRight: 10, zIndex: 1}}>
    {/* <Searchbar
        style={{borderRadius:5}}
        placeholder="Search Stocks"
        onChangeText={(text) =>setSearchQuery(text)}
        value={searchQuery}
        onIconPress={()=> handleSearch(searchQuery)}
        />  */}
        <AutocompleteDropdown
        ref={searchRef}
        initialValue={searchQuery}
        dataSet={suggestions}
        onChangeText={text => handleChangeInput(text)}
        onSelectItem={(item) => {
          handleSuggestionClick(item)
        }}
        renderItem={(item, text, index) => (
            <View key={index} style={{width: '100%'}}><Text style={{ color: "#fff", padding: 15 }}>{item.symbol + ' - ' + item.description} </Text></View>
        )}
        debounce={300}
        loading={loading}
        useFilter={false} 
        textInputProps={{
          placeholder: searchQuery,
          autoCorrect: false,
          autoCapitalize: "none",
          style: {
            borderRadius: 25,
            backgroundColor: "#383b42",
            color: "#fff",
            paddingLeft: 18,
          }
        }}
        suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
        rightButtonsContainerStyle={{
          borderRadius: 25,
          right: 8,
          height: 30,
          top: 10,
          alignSelfs: "center",
          backgroundColor: "#383b42"
        }}
        inputContainerStyle={{
          backgroundColor: "transparent",
          
        }}
        suggestionsListContainerStyle={{
          backgroundColor: "#383b42",
        }}
        containerStyle={{ flexGrow: 1, flexShrink: 1, 
          height: 308, width: '100%', zIndex: 4000, position: 'absolute'}}
        ChevronIconComponent={
          <Feather name="x-circle" size={18} color="#fff" />
        }
        ClearIconComponent={
          <Feather name="chevron-down" size={20} color="#fff" />
        }
        inputHeight={50}
        showChevron={false}
      />
      
        
        {isLoading ? <View style={styles.loading}><ActivityIndicator size='large' color="#0000ff"/></View> : 
        <View style={{zIndex: -1, marginTop: 56, position: 'relative', width: '100%'}}>
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

        <View style={{height: 200, marginTop: 150, zIndex: -1, position: 'absolute'}} key="chart">
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
        
        <View key = "watchlist" style={{zIndex: -1, marginTop: 400, position: 'absolute', width: '100%'}}>
          {isInWatchList ? 
          <Button icon="eye" mode="contained" disabled color="#1e3a8a" size = "small" style={styles.Btn}> Already in watchlist</Button> : 
          <TouchableOpacity onPress={handleAddWatchlist} >
          <Button 
          icon="eye" mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}> Add to watchlist </Button></TouchableOpacity>}
        </View>,
        <View  style={{zIndex: -1, marginTop: 450, position: 'absolute', width: '100%'}} ><TouchableOpacity onPress={handleShowComment}>
        <Button key="Comments" 
        icon="comment-multiple" mode="contained" color="#1e3a8a" size = "small" style={styles.Btn}
        
        >
        Show Comments
        </Button></TouchableOpacity></View>
        ]
          : <View style={styles.noSearchStock}><Text>There is no such stock symbol</Text></View>
          }
          </View>}</View>
       
      </ScrollView>
    );

}

const styles = StyleSheet.create({
    noSearchStock: { zIndex: 1, marginTop: 40,
       marginLeft: 'auto', marginRight: 'auto'
    },
    loading: {
      flex: 1,
      justifyContent: "center",
      flexDirection: "row",
      justifyContent: "space-around",
      padding: 10,
      marginTop: 0,
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
      marginHorizontal: 0,
      width: 370,
      height: 230
    },
    img_view: {
      position: 'absolute',
      paddingRight:0, 
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