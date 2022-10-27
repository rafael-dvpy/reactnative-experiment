import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { auth, database } from "../firebase-config";
import { useNavigation } from "@react-navigation/native";
import { onValue, ref, set } from "firebase/database";

const UserScreen = () => {
  const navigation = useNavigation();

  interface currentUserType {
    uuid: string;
    email: string;
    name: string;
    age: string;
  }

  const [uid, setUid] = useState("");

  const [userCreated, setUserCreated] = useState(false);

  const [currentUser, setCurrentUser] = useState<currentUserType>({
    uuid: "",
    email: "",
    name: "",
    age: "",
  });

  const [currentData, setCurrentData] = useState({});

  const handleSignOut = () => {
    auth.signOut().then(() => {
      navigation.reset({ index: 0, routes: [{ name: "Login" }] });
    });
  };

  const readData = () => {
    const userRef = ref(database, "users/" + uid);
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setCurrentData(data);
      if (data !== null) {
        setCurrentUser({
          uuid: data.uuid,
          email: data.email,
          name: data.name,
          age: data.age,
        });
      }
    });
  };

  const createData = (name: string, email: string, age: number) => {
    set(ref(database, "users/" + uid), {
      name: name,
      email: email,
      age: age,
    });
  };

  useEffect(() => {
    setUid(`${auth.currentUser?.uid}`);
    readData();
    if (currentUser.name !== "") {
      setUserCreated(true);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text>Email: {auth.currentUser?.email}</Text>
      {userCreated ? (
        <>
          <Text>User: {currentUser.name}</Text>
          <Text>Age: {currentUser.age}</Text>
        </>
      ) : (
        <>
          <TextInput
            placeholder="User"
            value={currentUser.name}
            onChangeText={(text) =>
              setCurrentUser({ ...currentUser, name: text })
            }
            style={styles.input}
          ></TextInput>
          <TextInput
            placeholder="Age"
            value={`${currentUser.age}`}
            onChangeText={(text) =>
              setCurrentUser({ ...currentUser, age: text })
            }
            style={styles.input}
          ></TextInput>
          <TouchableOpacity
            onPress={() => {
              createData(
                currentUser.name,
                `${auth.currentUser?.email}`,
                parseInt(currentUser.age)
              );
            }}
            style={(styles.button, styles.buttonOutline)}
          >
            <Text style={(styles.button, styles.buttonOutlineText)}>
              Register
            </Text>
          </TouchableOpacity>
        </>
      )}

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
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonOutline: {
    backgroundColor: "white",
    alignItems: "center",
    marginTop: 5,
    width: "100%",
    borderColor: "#0782F9",
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
