import { Appbar } from 'react-native-paper';
import React from 'react';
 
function StockChartNavigationBar({ navigation }){
 
return (
    <Appbar.Header style={{
        backgroundColor: "white"}}> 
        <Appbar.Action icon="chevron-left" onPress={ () => {navigation.goBack() }}></Appbar.Action>  
      <Appbar.Content title="Stock Chart"/>
      <Appbar.Action />
    </Appbar.Header>
  );
    }
    
export default StockChartNavigationBar;