import React, { useState } from 'react';
import { Text,FlatList } from 'react-native';
import { TouchableOpacity,TouchableHighlight,ScrollView,Keyboard, StyleSheet, View, Alert } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Button,Title } from 'react-native-paper';
import { SimpleLineIcons } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons';
import StorageDataService from '../services/StorageDataService'; 

export default function WatchList({ navigation, route }){

    const userWatchlist = async() => { 
        await StorageDataService.getUserWatchlist();
        console.log(await StorageDataService.getUserWatchlist());

        
    }
    
    const [watchlist, setWatchlist] = useState(
        
            [userWatchlist]
            .map((row, index) => ({ key: `${index}`, text: `Stockticker: ${row.stockticker} ` }))
    );

    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const newData = [...watchlist];
        const prevIndex = watchlist.findIndex(item => item.key === rowKey);
        newData.splice(prevIndex, 1);
        setWatchlist(newData);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => (
        <TouchableHighlight
            onPress={() => console.log('You touched me')}
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{data.item.text}</Text>
            </View>
        </TouchableHighlight>
    );

    const renderHiddenItem = (data, rowMap) => (
        <View style={styles.rowBack}>
            <Text>Left</Text>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, data.item.key)}
            >
                <Button>
                    <MaterialIcons name="settings" size={24} color="#1e3a8a" />
                </Button>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={DeleteAlert/*() => deleteRow(rowMap, data.item.key)*/}
            >
                {/* <Text style={styles.backTextWhite}>Delete</Text> */}
                <Button>
                <MaterialIcons name="delete" size={24} color="#1e3a8a" />
                
                </Button>
            </TouchableOpacity>
        </View>
    );

    const DeleteAlert = (data,rowMap,rowKey) =>
    Alert.alert(
      "Delete Stock from Watchlist?",
      "*Note that your notification settings for this stock will be deleted as well!",
      [
        {
          text: "Cancel",
          onPress:() => console.log("Cancel"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => console.log("Deleted") }
      ],
      { cancelable: false }
    );



    

    
    
    return(
        
        <View style={{backgroundColor:'white', flex:1}}>
            <Button onPress={userWatchlist}></Button>
            <Title style={{alignSelf:'center'}}>My Watchlist</Title>
            <SwipeListView style={{marginTop:20}}
                useFlatList={true}
                data={watchlist}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                 leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
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
        
     ) }        


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
        //borderTopColor:'black',
        //borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
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
        backgroundColor:'white',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor:'white',
        right: 0,
    },
})