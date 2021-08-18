import React from 'react';
import { Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from './styles/global';
import { Searchbar, DataTable } from 'react-native-paper';
import { Button,Text } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function WatchList({ navigation, route }){

    

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard')
        }}>
        <View style={{backgroundColor:'white', flex:1}}>
        <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={()=> console.log({searchQuery})}
        />

        <Text> {searchQuery} </Text>

        <DataTable>
        <DataTable.Header>
            <DataTable.Title>Stock Ticker</DataTable.Title>
            <DataTable.Title>Company Name</DataTable.Title>
            <DataTable.Title numeric>Price (USD)</DataTable.Title>
            <DataTable.Title  numeric>Actions</DataTable.Title>
        </DataTable.Header>

        <DataTable.Row>
            <DataTable.Cell>AAPL</DataTable.Cell>
            <DataTable.Cell>Apple Inc</DataTable.Cell>
            <DataTable.Cell numeric>35.03</DataTable.Cell>
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
            <DataTable.Cell>PLTR</DataTable.Cell>
            <DataTable.Cell>Palantir Tech</DataTable.Cell>
            <DataTable.Cell numeric>42.12</DataTable.Cell>
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
            <DataTable.Cell>TSLA</DataTable.Cell>
            <DataTable.Cell>Tesla</DataTable.Cell>
            <DataTable.Cell numeric>45.56</DataTable.Cell>
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
            <DataTable.Cell>SOFI</DataTable.Cell>
            <DataTable.Cell>Sofi Tech</DataTable.Cell>
            <DataTable.Cell numeric>16.65</DataTable.Cell>
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
            <DataTable.Cell>BYND</DataTable.Cell>
            <DataTable.Cell>Beyond Meat</DataTable.Cell>
            <DataTable.Cell numeric>0.78</DataTable.Cell>
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
            <DataTable.Cell>SFT</DataTable.Cell>
            <DataTable.Cell>Shift Tech</DataTable.Cell>
            <DataTable.Cell numeric>150.34</DataTable.Cell>
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
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 24
    }
})