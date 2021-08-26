import React, { useState } from "react";
import { Text, ToastAndroid } from "react-native";
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
import { Icon } from 'react-native-elements';

export default function WatchList({ navigation, route }) {
  const isFocused = useIsFocused();
  const [watchlist, setWatchlist] = React.useState([]);
  const [user, setuser] = useState("");
  const selectedStock = useState(null);

  const handleDeleteWatchlist = async (stockticker) => {
    try {
      ToastAndroid.showWithGravity(
        stockticker + " deleted from watchlist!",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
      //delete from storage
      await StorageDataService.deleteStockToWatchlist(stockticker);
      console.log(await StorageDataService.getUserWatchlist());
      //delete from db
      const user = await AsyncStorage.getItem("username");
      await WatchlistService.deleteStockWatchlist(stockticker, user);
      const newWatchlist = await StorageDataService.getUserWatchlist();
      setWatchlist(newWatchlist);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    async function fetchWatchlist() {
      try {
        const req = await StorageDataService.getUserWatchlist();
        const watchlistData = req;
        console.log(watchlistData);
        const user = await AsyncStorage.getItem("username");
        setuser(user);
        console.log(user);
        setWatchlist(
          watchlistData.map((x) => {
            return { stockticker: x.stockticker, stockname: x.stockname };
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
    <View
        
          key={data.item.stockticker}
          style={styles.rowFront}
          underlayColor={"#AAA"}
        >
          <View style={{flexDirection:"column", flex:1}}>
            <Text style={{fontSize:18,fontWeight:'bold'}}>{data.item.stockticker.toUpperCase()} </Text>
            <Text style={{fontSize:12}}>{data.item.stockname}</Text> 
            
          </View>
          <View style={{justifyContent: 'center', alignItems: 'center'}} >
            <Icon  name="chevron-right" size={25}/> 
          </View>
          
        
    </View>
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
          <MaterialIcons name="settings" size={24} color="white" />
        </Button>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.backRightBtn, styles.backRightBtnRight]}
        onPress={() => DeleteAlert(data.item.stockticker)}
      >
        {/* <Text style={styles.backTextWhite}>Delete</Text> */}
        <Button>
          <MaterialIcons name="delete" size={24} color="white" />
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
      <SwipeListView
        style={{ marginTop: 20 }}
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
      
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  backTextWhite: {
    color: "black",
  },
  rowFront: {
    paddingLeft:30,
    textAlign:'left',
    backgroundColor: "white",
    borderTopColor: "grey",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
    justifyContent: "flex-start",
    flexDirection:"row",
  
    height: 50,
  },
  rowBack: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: "center",
    bottom: 0,
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: "#1e3a8a",
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: "red",
    right: 0,
  },
});
