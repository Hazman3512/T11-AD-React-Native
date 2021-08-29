import React, { useState, useEffect, useRef} from 'react';
import { StyleSheet, View } from 'react-native';
import { FAB, TextInput, Provider, Portal, Dialog} from 'react-native-paper';
import { Button, Text, Card, Icon } from 'react-native-elements';
import { TouchableOpacity, ActivityIndicator } from 'react-native';
import StockService from '../services/StockService'
import ChartService from '../services/ChartService'
import { FlatList } from 'react-native';

export default function Comments({ navigation, route }){

    const { ticker, user } = route.params;

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newCommentText, setNewCommentText] = useState("");
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const [commentSentiment, setCommentSentiment] = useState("");

    const addComments = (newComment) => {
        setComments([newComment, ...comments]);
    }

    useEffect(() => {
        async function fetchComments() {
            try{
                setIsLoading(true);
                const req = await StockService.getStockComments(ticker);
                const commentData = req.data          
                // console.log(commentData)
                setComments(commentData.map((x) => {
                    return ({user: x.username, timestamp: x.commentDateTime, content: x.comment});
                }))
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                setError(error);
                console.log(error)
            }
        }

        fetchComments()
    }, [setComments]
    )

    useEffect(() => {
        async function fetchCommentSentiment() {
            try{
                const commentSentimentReq = await ChartService.getLatestStockCommentSentiment(ticker);
                const commentSentimentData = commentSentimentReq.data;
                setCommentSentiment(commentSentimentData);
                console.log("comments sentiment: ")
                console.log(commentSentiment)
            } catch (error) {
                console.log(error)
            }
        }
        fetchCommentSentiment()
    }, [setCommentSentiment]
    )

    if (isLoading) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color="#5500dc" />
          </View>
        );
      }
    
      if (error) {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18}}>
              Error fetching data... Check your network connection!
            </Text>
          </View>
        );
      }


    const CommentInfo = ({ user, timestamp, content }) => (
        <View style={styles.item}>
            <Card>
            <Text style={styles.user}>
                <Icon name="account-circle"/>
                {" "}{ user }
            </Text>
            <Text style={styles.content}>{ content }</Text>
            <Text style={styles.timestamp}>posted on: {timestamp}</Text>
            </Card>
        </View>
    )

    const renderItem = ({ item }) => (
            <CommentInfo user={item.user} timestamp={item.timestamp} content={item.content} />
        );
    
              
    const AddCommentFAB = () => (
        <FAB
          style={styles.fab}
          icon="plus"
          color= '#1e3a8a'
          onPress={
              () => setIsDialogVisible(true)
            }
        />
    );

    const renderAddCommentPopup = () => (

            <Dialog
            visible={isDialogVisible}
            onDismiss={() => setIsDialogVisible(false)}>
            <Dialog.Title>Post Comment</Dialog.Title>
            <Dialog.Content>
                <Text>Comment</Text>
                <TextInput
                    defaultValue={newCommentText}
                    multiline
                    onChangeText={(text) => {setNewCommentText(text)}}
                />
            </Dialog.Content>
            <Dialog.Actions>
                <TouchableOpacity
                style={styles.button}
                onPress={() => setIsDialogVisible(false)}>
                    <Text>Cancel</Text>
                </TouchableOpacity>
                <View style={styles.space}></View>
                <TouchableOpacity 
                style={styles.button}
                onPress={() => {
                    handleSubmissionAndClose();
                    }}>
                <Text>Submit</Text>
                </TouchableOpacity>
            </Dialog.Actions>
            </Dialog>
        
    )
    
    const renderCommentSentiment = () => {
        {(commentSentiment !== "") ? <Text style={styles.sentiment}>Comments Sentiment: {commentSentiment.toLowerCase() === "positive" ? <Text style={styles.sentimentPositive}> {commentSentiment}</Text> : (commentSentiment.toLowerCase() === "negative" ? <Text style={styles.sentimentNegative}> {commentSentiment}</Text> : <Text styles={styles.sentimentNeutral}> {commentSentiment}</Text>)}</Text>: <Text></Text>}
    }

    const handleSubmissionAndClose = async () => {
        const postComment = {username: user, commentDateTime: Math.floor(Date.now()/1000), stockticker: ticker, comment: newCommentText}
        try {
            const Resp = await StockService.postStockComment(ticker, postComment)
            const data = Resp.data;
            // console.log(data);
            const comment = {...data, user: data.username, timestamp: data.commentDateTime, content: data.comment}
            addComments(comment)
        } catch (error) {
            console.log("error submitting comment")
            console.log(error)
        }

        setIsDialogVisible(false);
        setNewCommentText("");
    }
    

    return(
        <Provider>
        <View style={{backgroundColor:'white', flex:1}}>
            <Text></Text>
            {comments.length !== 0 ? <Text style={styles.sentiment}>Comments Sentiment: {commentSentiment.toLowerCase() === "positive" ? <Text style={styles.sentimentPositive}> {commentSentiment}</Text> : (commentSentiment.toLowerCase() === "negative" ? <Text style={styles.sentimentNegative}> {commentSentiment}</Text> : <Text styles={styles.sentimentNeutral}> {commentSentiment}</Text>)}</Text> : <Text></Text>}
            {(comments.length !== 0) ? 
        <FlatList
            data={comments}
            renderItem={renderItem}
            keyExtractor={(item, index)=> 'key'+index}
            extraData={comments}/>
        : <View><Text style={styles.noCommentsText}>There are no comments yet!</Text></View> }
        <AddCommentFAB />
        {renderAddCommentPopup()}
        </View>
        </Provider>
        
    )
}


const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 24,
        right: 0,
        bottom: 0,
      },
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
        marginLeft: 30,
        color: "gray"
    },
    button: {
        alignItems: "center",
        padding: 5,
        backgroundColor: "#DDDDDD",
    },
    space: {
        width: 10,
        height: 20,
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
    sentiment: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 30
    },
    noCommentsText: {
        textAlign: "center",
        fontSize: 15,
    }
})