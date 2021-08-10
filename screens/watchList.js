import React from 'react';
import { Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from './styles/global';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android';
import { Text } from 'react-native-elements';

export default function WatchList({ navigation, route }){
    
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard')
        }}>
        <View style={styles.container}>
            <Text h1>My Watchlist</Text>
            <SearchBar
                placeholder="Search"
                />
        
        </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 24
    }
})