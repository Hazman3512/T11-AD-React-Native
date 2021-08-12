import React from "react";
import { StyleSheet, View } from "react-native";
import { VictoryAxis, VictoryCandlestick,VictoryBar, VictoryChart, VictoryTheme } from "victory-native";

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

export default function History({ navigation }){


    return (


        <View style={styles.container}>
            <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={{ x: 25 }}
                scale={{ x: "time" }}
                >
                <VictoryAxis tickFormat={(t) => `${t.getDate()}/${t.getMonth()}`}/>
                <VictoryAxis dependentAxis/>
                <VictoryCandlestick
                candleColors={{ positive: "#5f5c5b", negative: "#c43a31" }}
                //data={sampleDataDates}
                />
                </VictoryChart>
        </View>
    )




}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f5fcff"
    }
  });