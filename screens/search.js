import React, {useState, useEffect} from 'react';
import { FlatList, StyleSheet,Keyboard, View, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import SearchBar from 'react-native-elements/dist/searchbar/SearchBar-android';
import { globalStyles } from './styles/global';
import { Text } from 'react-native-elements';


export default function Search( { navigation, route } ){

    const [data, setData] = useState([]);
    const [query, setQuery] = useState('');
    const [cryptos, setCryptos] = useState([]);

    const fetchData = async () => {
    const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
    const json = await res.json();
    setData(json);
    setCryptos(json.slice());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateQuery = (input) => {
    setQuery(input);
    console.log(query);
    setCryptos(data.slice())
  }

  const filterNames = (crypto) => {
    // 1.
    let search = query.toLowerCase().replace(/ /g,"_"); 
    //2.
    if(crypto.name.startsWith(search, 0)){
       //3.
       return formatNames(crypto);
    }else{ 
       //4.
       cryptos.splice(cryptos.indexOf(crypto), 1);
       return null;
    }
 }

 const formatNames = (crypto) => {
    let cryptoName = crypto.name;
    return cryptoName;
 }

  




    return(
       
        <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss();
            console.log('dismissed keyboard')
        }}>
        <View style={globalStyles.container}>
            <Text h1>Search Stock</Text>
            <SearchBar
                onChangeText={updateQuery}
                value={query}
                placeholder="Search"
            />
            <FlatList 
            data={cryptos} 
            keyExtractor = {(i)=>i.id.toString()}
            extraData = {query} 
            renderItem = {({item}) =>
                <TouchableOpacity onPress={() => console.log("clicked")}>

                
                <Text style={styles.flatList}>{filterNames(item)}
                </Text>
                </TouchableOpacity>
                } 
              />
              

               
        </View>
        </TouchableWithoutFeedback>

        
    )
}


const styles = StyleSheet.create({
    flatList:{
        flex: 1,
        paddingLeft: 15, 
        marginTop:15, 
        paddingBottom:15,
        fontSize: 20,
        borderBottomColor: '#26a69a',
        borderBottomWidth:1
    }
  });