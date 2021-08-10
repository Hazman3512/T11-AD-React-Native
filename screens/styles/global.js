import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex:1,
        //padding:24,
        alignItems: 'center',
        justifyContent:'center'
    },
    titleText: {
        fontFamily: 'nunito-bold',
        fontSize: 18,
        color: '#333'
    },
    paragraph: {
        marginVertical : 8,
        lineHeight: 20,
        
    }
})