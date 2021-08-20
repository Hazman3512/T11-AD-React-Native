import React from 'react';
import { Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from './styles/global';
import { Searchbar, DataTable } from 'react-native-paper';
import { Button,Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import WatchlistService from '../services/WatchlistService';

export default function WatchList({ navigation, route }){

    

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    
    return(
        
        <View style={{backgroundColor:'white', flex:1}}>
        

        <DataTable>
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

        
        

        </View>
        
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 24
    }
})