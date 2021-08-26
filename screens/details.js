import React, {Component} from 'react';
import {StyleSheet,View,Text} from 'react-native';

export default class detail extends React.Component{
	render(){
		return(
			<View style={styles.container}>
				<TouchableOpacity onPress={this._pressBackButton.bind(this)}>
					<Text style={styles.back}>back</Text>
				</TouchableOpacity>
				
		          <Text>{stockInfo.companyName}</Text>
		          <Text style = {styles.stockTicker}>{stockInfo.stockTicker}</Text>
		          <Text style={styles.initialPrice}>{(stockInfo.initialPrice).toFixed(2)}</Text>
		          <Text></Text>
		          <Text style = {styles.sentiment}>Sentiment: 
		            <Text style = {styles.sentimentInner}> {stockInfo.sentiment}</Text> 
		          </Text>
		          <View style={{height: 220, marginTop: 20}}><Button icon='graph'>View Chart</Button></View>
          </View>
		);
	}

	
	_pressBackButton(){
		const {navigator} = this.props;
		if(navigator){
			naigator.pop();
		}
	}
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
    },
    back:{
		fontSize: 20,
		color: 'blue'
	}
});

