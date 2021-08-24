import React, { useState } from "react";
import { Text, FlatList, ToastAndroid } from "react-native";
import {
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
  Keyboard,
  StyleSheet,
  View,
  Alert,
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import { Button, Title } from "react-native-paper";
import { SimpleLineIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import StorageDataService from "../services/StorageDataService";
import { useEffect, useRef } from "react";
import { useIsFocused } from "@react-navigation/native";
import WatchlistService from "../services/WatchlistService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function WatchList({ navigation, route }) {
  const isFocused = useIsFocused();
  const [watchlist, setWatchlist] = React.useState([]);
  const [user, setuser] = useState("");

  const selectedStock = useState(null);

    const selectedStock = useState(null);

    const handleDeleteWatchlist = async (stockticker) => {
        
       try {
          ToastAndroid.showWithGravity(stockticker + ' deleted from watchlist!', ToastAndroid.SHORT, ToastAndroid.TOP);
          //delete from storage 
          await StorageDataService.deleteStockToWatchlist(stockticker);
          console.log(await StorageDataService.getUserWatchlist());
          //delete from db
            const user = await AsyncStorage.getItem("username");
          await WatchlistService.deleteStockWatchlist(stockticker, user);
          const newWatchlist = await StorageDataService.getUserWatchlist();
          setWatchlist(newWatchlist);
       }
       catch(e){
           console.log(e);

       }
    
        }

      useEffect(() => {
          console.log('a');
      })
    
     useEffect(() => {
         async function fetchWatchlist(){
             try{
                 const req = await StorageDataService.getUserWatchlist();
                 const watchlistData = req;
                 console.log(watchlistData);
                 setWatchlist(watchlistData.map((x) => {
                     return({stockticker:x.stockticker});
                 }))
                }catch(error){

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const req = await StorageDataService.getUserWatchlist();
        const watchlistData = req;
        console.log(watchlistData);
        setuser(await AsyncStorage.getItem("username"));
        console.log(user);
        setWatchlist(
          watchlistData.map((x) => {
            return { stockticker: x.stockticker };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    fetchWatchlist();
  }, [isFocused]);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...watchlist];
    const prevIndex = watchlist.findIndex((item) => item.key === rowKey);
    newData.splice(prevIndex, 1);
    setWatchlist(newData);
  };

  const onRowDidOpen = (rowKey) => {
    console.log("This row opened", rowKey);
  };

  const renderItem = (data) => (
    <TouchableHighlight
      key={data.item.stockticker}
      onPress={() => console.log("You pressed me")}
      style={styles.rowFront}
      underlayColor={"#AAA"}
    >
      <View>
        <Text>{data.item.stockticker}</Text>
      </View>
    </TouchableHighlight>
  );

  const renderHiddenItem = (data) => (
    <View style={styles.rowBack}>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnLeft]}
        onPress={() =>
          navigation.navigate("Settings", {
            user: user,
            ticker: data.item.stockticker,
          })
        }
      >
        <Button>
          <MaterialIcons name="settings" size={24} color="#1e3a8a" />
        </Button>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => DeleteAlert(data.item.stockticker)}
      >
        {/* <Text style={styles.backTextWhite}>Delete</Text> */}
        <Button>
          <MaterialIcons name="delete" size={24} color="#1e3a8a" />
        </Button>
      </TouchableOpacity>
    </View>
  );

  const DeleteAlert = (ticker) =>
    Alert.alert(
      "Delete " + ticker + " from Watchlist?",
      "*Note that your notification settings for this stock will be deleted as well!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel"),
          style: "cancel",
        },
        { text: "Delete", onPress: () => handleDeleteWatchlist(ticker) },
      ],
      { cancelable: false }
    );

  return (
    <View style={{ flex: 1 }}>
      {/* <Title style={{ alignSelf: "center", marginTop: 20 }}>My Watchlist</Title> */}
      <SwipeListView
        style={{ marginTop: 50 }}
        useFlatList={true}
        data={watchlist}
        renderItem={renderItem}
        keyExtractor={(item, index) => "key" + index}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={0}
        rightOpenValue={-150}
        previewRowKey={"0"}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
        closeOnRowBeginSwipe={true}
        closeOnRowPress={true}
        disableRightSwipe={true}
        closeOnScroll={true}
      />
      {/* <FlatList
                data={stocks}
                renderItem={({ item }) => (
                    
                    <Text style={styles.stock}>{item.text}</Text>
                    
                )}
            /> */}
    </View>

    /* <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
        </TouchableOpacity> */

    /* <DataTable>
        <DataTable.Header style={{marginTop:70}}>
            <DataTable.Title>No.</DataTable.Title>
            <DataTable.Title>Stock Ticker</DataTable.Title>
            <DataTable.Title>Company Name</DataTable.Title>
            <DataTable.Title  numeric>Actions</DataTable.Title>
        </DataTable.Header>
        <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>AAPL</DataTable.Cell>
            <DataTable.Cell>Apple Inc</DataTable.Cell>
            <DataTable.Cell numeric>
                <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
                </TouchableOpacity>
                
                
            </DataTable.Cell>
            
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>2</DataTable.Cell>
            <DataTable.Cell>PLTR</DataTable.Cell>
            <DataTable.Cell>Palantir Tech</DataTable.Cell>
            <DataTable.Cell numeric>
            <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
            </TouchableOpacity>
            </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>3</DataTable.Cell>
            <DataTable.Cell>TSLA</DataTable.Cell>
            <DataTable.Cell>Tesla</DataTable.Cell>
            <DataTable.Cell numeric>
            <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
            </TouchableOpacity>
            </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>4</DataTable.Cell>
            <DataTable.Cell>SOFI</DataTable.Cell>
            <DataTable.Cell>Sofi Tech</DataTable.Cell>
            <DataTable.Cell numeric>
            <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
            </TouchableOpacity>
            </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>5</DataTable.Cell>
            <DataTable.Cell>BYND</DataTable.Cell>
            <DataTable.Cell>Beyond Meat</DataTable.Cell>
            <DataTable.Cell numeric>
            <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
            </TouchableOpacity>
            </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
            <DataTable.Cell>6</DataTable.Cell>
            <DataTable.Cell>SFT</DataTable.Cell>
            <DataTable.Cell>Shift Tech</DataTable.Cell>
            <DataTable.Cell  numeric >
            <TouchableOpacity>
                    <Button  icon={{
                            name: "settings",
                            size: 25,
                            color: "#1e3a8a"
                        }} title="" type="clear"></Button>
            </TouchableOpacity>
                
                
            </DataTable.Cell>
        </DataTable.Row>
        </DataTable>
        
        
        */
  );
}

const styles = StyleSheet.create({
    container:{
        padding: 24
    },
    backTextWhite: {
        color: 'black',
    },
    rowFront: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderTopColor:'grey',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor:'#1e3a8a',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor:'red',
        right: 0,
    },
})
