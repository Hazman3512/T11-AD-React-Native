import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button,Searchbar } from 'react-native-paper';


export default function Search({navigation, route}) {


  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);


    return (
      
        <View style={{flex:1,backgroundColor:'white'}} >
        <Searchbar
        style={{borderRadius:5}}
        placeholder="Search Stocks"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={()=> console.log({searchQuery})}
        />

          <Text> {searchQuery} </Text>

        </View>

        

     
    )

}