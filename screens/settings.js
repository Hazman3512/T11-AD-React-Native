import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Switch,
  ScrollView,
  Image,
} from "react-native";
import {
  Button,
  Subheading,
  Text,
  Card,
  Title,
  Paragraph,
} from "react-native-paper";
import { Picker as SelectPicker } from "@react-native-picker/picker";
import { FlatList } from "react-native";
import { Navigation } from "@material-ui/icons";
import WatchlistService from "../services/WatchlistService";

export default function Settings({ navigation, route }) {
  const { ticker, user } = route.params;
  const [toggleState, setToggleState] = useState({
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
  });

  const [timing, settiming] = useState({
    timing1: "0",
    timing2: "0",
    timing3: "0",
    timing4: "0",
  });

  const candleTypes = [
    {
      id: "1",
      name: "Bullish Engulfing Pattern",
      imgSrc: require("../assets/bullish_engulfing.png"),
    },
    {
      id: "2",
      name: "Bearish Engulfing Pattern",
      imgSrc: require("../assets/bearish_engulfing.png"),
    },
    {
      id: "3",
      name: "Bullish Morning Star Pattern",
      imgSrc: require("../assets/morning_star.png"),
    },
    {
      id: "4",
      name: "Bearish Evening Star Pattern",
      imgSrc: require("../assets/evening_star.png"),
    },
  ];
  //const [enabled, setEnabled] = useState(false);
  const toggleSwitch = (id) => {
    setToggleState({
      ...toggleState,
      ["checked" + id]: !toggleState["checked" + id],
    });
    //setEnabled((oldValue) => !oldValue);
    //console.log(ticker);
  };

  useEffect(() => {
    loadStockSetting();
  }, []);

  //name to send over to backend
  const candleName = [
    "Bullish Engulfing",
    "Bearish Engulfing",
    "Morning Star",
    "Evening Star",
  ];
  const saveChanges = async () => {
    const req = await WatchlistService.getWatchlistCandle(ticker, user);
    const candleReqData = req.data;
    const now = Math.floor(Date.now() / 1000);
    console.log(now);
    const candleInfo = candleReqData.map((x, index) => {
      return {
        ...x,
        username: user,
        stockticker: ticker,
        active: toggleState["checked" + (index + 1)],
        candlename: candleName[index],
        datetime:
          candleReqData[index].active !==
            toggleState["checked" + (index + 1)] &&
          toggleState["checked" + (index + 1)]
            ? now
            : candleReqData[index].active !==
              toggleState["checked" + (index + 1)]
            ? "0"
            : candleReqData[index].datetime !== "0"
            ? new Date(candleReqData[index].datetime).getTime() / 1000
            : "0",
      };
    });
    await console.log(candleInfo);
    await WatchlistService.setWatchlistCandle(candleInfo);
    navigateback();
    loadStockSetting();
  };

  const navigateback = () => {
    navigation.navigate("watchList");
  };

  const loadStockSetting = async () => {
    const req = await WatchlistService.getWatchlistCandle(ticker, user);
    const candleReqData = req.data;
    console.log(candleReqData);
    setToggleState({
      checked1: candleReqData[0].active,
      checked2: candleReqData[1].active,
      checked3: candleReqData[2].active,
      checked4: candleReqData[3].active,
    });
    settiming({
      timing1: candleReqData[0].datetime,
      timing2: candleReqData[1].datetime,
      timing3: candleReqData[2].datetime,
      timing4: candleReqData[3].datetime,
    });
  };

  return (
    <View style={styles.parent}>
      <Title style={{ alignSelf: "center", marginTop: 20 }}>
        Settings for {ticker}
      </Title>
      <FlatList
        keyExtractor={(item) => item.id}
        data={candleTypes}
        renderItem={({ item }) => (
          <Card style={styles.individualcard}>
            <Card.Content>
              <Title style={{ fontSize: 15 }}>{item.name} </Title>
              <Image style={styles.image} source={item.imgSrc} />
              <Switch
                onValueChange={() => toggleSwitch(item.id)}
                value={toggleState["checked" + item.id]}
              />
              <Text style={{ alignSelf: "flex-end", fontSize: 10 }}>
                {timing["timing" + item.id] !== "0"
                  ? "Active since:" + timing["timing" + item.id]
                  : "NA"}
              </Text>
            </Card.Content>
          </Card>
        )}
      />

      {/* <Card style={styles.individualcard}>
        <Card.Content>
          <Title>Bullish Engulfing</Title>
          <Image
            style={styles.image}
            source={require("../assets/bullish_engulfing.png")}
          />
          <Switch onValueChange={toggleSwitch} value={enabled} />
        </Card.Content>
      </Card> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        <Button
          style={{
            marginTop: 5,
            marginHorizontal: 70,
            marginBottom: 10,
          }}
          color="#1e3a8a"
          mode="contained"
          icon="cancel"
          onPress={() => navigation.navigate("watchList")}
        >
          Cancel
        </Button>
        <Button
          style={{
            marginTop: 5,
            marginHorizontal: 70,
            marginBottom: 10,
          }}
          color="#1e3a8a"
          mode="contained"
          icon="alert"
          onPress={() => {
            saveChanges();
          }}
        >
          Save Candles
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  parent: {
    flex: 1,
  },
  image: {
    width: 70,
    height: 40,
  },
  individualcard: {
    width: "75%",
    alignSelf: "center",
  },
});
