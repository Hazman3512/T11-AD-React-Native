import React, { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
import { Title, Text, Button, TextInput } from "react-native-paper";
import UserService from "../services/UserService";
import { Avatar } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import WatchlistService from "../services/WatchlistService";

export default function SignIn({ navigation }) {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState(true);

  //Authentication code
  const loginSuccessOrFail = async (response) => {
    if (response.status == 200) {
      AsyncStorage.setItem("username", username);
      //store user pre-saved watchlist
      try {
        const watchlist = await WatchlistService.getStockWatchlist(username);
        AsyncStorage.setItem("watchlist", JSON.stringify(watchlist.data));
        console.log(await AsyncStorage.getItem("watchlist"));

        navigation.navigate("MainTabScreen", { screen: "Search" });
      } catch (error) {
        console.log(error);
      }
    } else {
      isSuccess(false);
      setIsSuccess(false);
    }
    return;
  };

  function validateForm() {
    if (username == "" || password == "") {
      Alert.alert(
        "Wrong Input",
        "Username of password field cannot be empty!",
        [{ text: "OK" }]
      );
      return false;
    }
    if (isSuccess == false) {
      Alert.alert("Incorrect Input", "Username or password is incorrect!", [
        { text: "OK" },
      ]);
      return false;
    }
    return true;
  }

  function handleError() {
    if (isSuccess == false) {
      Alert.alert("Incorrect Input", "Username or password is incorrect!", [
        { text: "OK" },
      ]);
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    try {
      validateForm();
      const loginuser = { username: username, password: password };
      const req = await UserService.authenticateUser(loginuser);
      loginSuccessOrFail(req);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Avatar
        size="medium"
        rounded
        icon={{ name: "lock", type: "material-icons-outlined" }}
        activeOpacity={0.7}
        overlayContainerStyle={{ backgroundColor: "#1bbd7e" }}
        containerStyle={{
          alignSelf: "center",
          marginTop: 50,
          textAlign: "center",
        }}
      />

      <Title style={{ alignSelf: "center", marginTop: 20 }}>Sign In</Title>

      <TextInput
        style={{ marginTop: 50, paddingHorizontal: 10 }}
        label="Username"
        value={username}
        mode="outlined"
        onChangeText={(username) => setUsername(username)}
      />

      <TextInput
        style={{ marginTop: 20, paddingHorizontal: 10 }}
        label="Password"
        value={password}
        mode="outlined"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
      />

      <TouchableOpacity>
        <Button
          style={{ marginTop: 40, marginHorizontal: 10 }}
          mode="contained"
          color="#1e3a8a"
          onPress={handleSubmit}
        >
          Login
        </Button>
      </TouchableOpacity>

      <Text style={styles.register}>Don't have an account yet? </Text>
      <TouchableOpacity>
        <Button
          color="#1e3a8a"
          mode="text"
          style={{ marginTop: 20 }}
          onPress={() => navigation.navigate("Register")}
        >
          Register here
        </Button>
      </TouchableOpacity>

      {/* {isSuccess ?  <View />: <View>
                <Text style={{color:'red', fontSize:20}} >Information above is incorrect. Please try again!
                 </Text></View>} */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  register: {
    textAlign: "center",
    marginTop: 20,
  },
});
