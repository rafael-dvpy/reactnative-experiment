import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { auth } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";

const UserScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    });
  };
  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>

      <TouchableOpacity onPress={() => handleSignOut()} style={styles.button}>
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#0782F9",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});