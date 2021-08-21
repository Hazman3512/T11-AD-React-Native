import React, { useState, useEffect} from 'react';
import { Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from './styles/global';
import { Searchbar, DataTable } from 'react-native-paper';
import { Button, Text, Card, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import WatchlistService from '../services/WatchlistService';
import StockService from '../services/StockService'
import { FlatList } from 'react-native';

export default function Comments({ navigation, route }){

    const { ticker } = route.params;

    const [comments, setComments] = useState([null])
    const [isLoading, setLoading] = useState(true);
    
    const dummyComments = [{user: "zavier", timestamp: "0000", content: "test 123"},
                            {user: "zavier2", timestamp: "0000", content: "2nd comment"},
                            {user: "molly", timestamp: "0000", content: "test 123"},
                            {user: "seb", timestamp: "0000", content: "2nd comment"},
                            {user: "sam", timestamp: "0000", content: "test 123"},
                            {user: "tin", timestamp: "0000", content: "2nd comment"},
                            {user: "mox", timestamp: "0000", content: "test 123"},
                            {user: "sal", timestamp: "0000", content: "2nd comment"},
                            {user: "bro", timestamp: "0000", content: "test 123"},
                            {user: "sue", timestamp: "0000", content: "2nd comment"},

    ];
    // const fetchComments = async (ticker) => {
        
    //     try{
    //         const req = await StockService.getStockComments(ticker);
    //         const commentData = req.data          
    //         console.log(commentData)
          
    //         setComments(commentData.map((x) => {
    //             return ({user: x.username, timestamp: x.commentDateTime, content: x.comment});
    //         }))
            

    //     } catch(error){
    //         console.log(error)
    //     }
    // }

    // useEffect( () => {
    //     fetchComments(ticker)
    // })

    // useEffect(() => {
    //     const req = StockService.getStockComments(ticker)
    //     const commentData = req.data    
    //     req.then(({ comments }) => {
    //         console.log(commentData)
    //         setComments(commentData.map((x) => {
    //             return ({user: x.username, timestamp: x.commentDateTime, content: x.comment});
    //         })) })
    //         .catch((error) => console.log(error))
    //         .finally(() => setLoading(false));
    //     }, []);
       

    const CommentInfo = ({ user, timestamp, content }) => (
        <View style={styles.item}>
            <Card>
            <Text style={styles.user}>
                <Icon name="account-circle"/>
                {" "}{ user }
            </Text>
            <Text style={styles.content}>{ content }</Text>
            <Text style={styles.timestamp}>{ "posted on: " + timestamp }</Text>
            </Card>
        </View>
    )

    const renderItem = ({ item }) => (
            <CommentInfo user={item.user} timstamp={item.timestamp} content={item.content} />
        );
    

    return(
        
        <View style={{backgroundColor:'white', flex:1}}>
            {(dummyComments) ? 
        <FlatList
            data={dummyComments}
            renderItem={renderItem}
            keyExtractor={(item, index)=> 'key'+index}
        />
        : <View></View> }

        </View>
        
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 10
    },
    item: {
        marginVertical: 5,
        marginHorizontal: 16,
    },
    user: {
        fontSize: 20,
        alignItems: "center",
        justifyContent: 'space-between'
    },
    content: {
        fontSize: 15,
        marginLeft: 30,
    },
    timestamp: {
        fontSize: 15,
        color: "gray",
        marginLeft: 30,
    }
})