import React from 'react';
import { Button,Keyboard, StyleSheet, View, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from './styles/global';
import { Searchbar } from 'react-native-paper';
import { Text } from 'react-native-elements';

export default function WatchList({ navigation, route }){

    const { itemId, otherParam,anotherParam } = route.params;

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query);
    
    return(
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard')
        }}>
        <View>
        <Searchbar
        placeholder="Search..."
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={()=> console.log({searchQuery})}
        />

        <Text> {searchQuery} </Text>

        <Text>itemId: {JSON.stringify(itemId)}</Text>
        <Text>otherParam: {JSON.stringify(otherParam)}</Text>
        <Text>anotherParam: {JSON.stringify(anotherParam)}</Text>
        

        </View>
        </TouchableWithoutFeedback>
    )
}


const styles = StyleSheet.create({
    container:{
        padding: 24
    }
})