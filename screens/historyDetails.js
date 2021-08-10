import React from 'react';
import {  View, StyleSheet } from 'react-native';
import { globalStyles } from './styles/global';
import { Text } from 'react-native-elements';

export default function HistoryDetails( { navigation, route } ){
    return(
        <View style={styles.container}>
            <Text h1>Alert History</Text>

            
            
            
            
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        padding: 24
    }
})