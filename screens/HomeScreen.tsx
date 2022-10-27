import * as React from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button } from "react-native";
import { auth } from "../firebase-config";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [pullup, setPullup] = useState(true);

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    });
  };

  const changePullup = () => {
    setPullup(!pullup);
    // console.log(pullup);
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    map: {
      width: Dimensions.get("window").width,
      height: !pullup
        ? Dimensions.get("window").height / 2
        : Dimensions.get("window").height,
    },
  });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: 37.78825,
            longitude: -122.4324,
          }}
          onPress={() => changePullup()}
          pinColor="black"
        ></Marker>
      </MapView>
      <View style={{ marginTop: 30, marginBottom: 50 }}>
        <Button onPress={() => handleSignOut()} title="test button"></Button>
      </View>
      <Text>Plain text example</Text>
    </View>
  );
}

// import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import React from "react";
// import { auth } from "../firebase-config";
// import { useNavigation } from "@react-navigation/native";
//
// const HomeScreen = () => {
// import { useNavigation } from "@react-navigation/native";
// const navigation = useNavigation();
//
// const handleSignOut = () => {
// auth.signOut().then(() => {
// navigation.reset({ index: 0, routes: [{ name: "Login" }] });
// });
// };
// return (
// <View style={styles.container}>
{
  /* <Text>Email: {auth.currentUser?.email}</Text> */
}
{
  /*  */
}
{
  /* <TouchableOpacity onPress={() => handleSignOut()} style={styles.button}> */
}
{
  /* <Text style={styles.buttonText}>Sign out</Text> */
}
{
  /* </TouchableOpacity> */
}
{
  /* </View> */
}
// );
// };
//
// export default HomeScreen;
//
// const styles = StyleSheet.create({
// container: {
// flex: 1,
// justifyContent: "center",
// alignItems: "center",
// },
// button: {
// backgroundColor: "#0782F9",
// width: "60%",
// padding: 15,
// borderRadius: 10,
// alignItems: "center",
// marginTop: 40,
// },
// buttonText: {
// color: "white",
// fontWeight: "700",
// fontSize: 16,
// },
// });
//
