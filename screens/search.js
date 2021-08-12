import React from 'react';
import {Button,Text, View} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';


export default function Search({navigation, route}) {


  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);


    return (
      <TouchableWithoutFeedback>
        <View>
        <Searchbar
        placeholder="Search Stocks"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onIconPress={()=> console.log({searchQuery})}
        />

          <Text> {searchQuery} </Text>

        </View>

        <View>
            
            <Button
              title="Pass data to watchlist"
              onPress={() => {
                /* 1. Navigate to the Watchlist route with params */
                navigation.navigate('Watchlist', {
                  itemId: 1,
                  otherParam: 'AAPL',
                  anotherParam: '145.86'
                });
              }}
            />

          
        </View>


      </TouchableWithoutFeedback>

    )

}