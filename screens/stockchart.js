import React from 'react';
import {View} from 'react-native';
import { WebView } from 'react-native-webview';
 
export default function Stockchart({navigation, route}) {
    const { ticker } = route.params;
 
    return(
        <View style={{backgroundColor:'white', flex:1, padding: 16}}>
         <WebView source={{uri:`https://www.tradingview.com/chart/?symbol=${ticker}`}}></WebView> 
        {/* <WebView source={{uri:`http://192.168.0.113:3000/mobileStockChart/${ticker}`}}></WebView> */}
        </View>
    );
}