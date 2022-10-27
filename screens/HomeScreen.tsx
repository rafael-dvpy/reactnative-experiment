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
