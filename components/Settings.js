import { StyleSheet, Text, SafeAreaView, View, Button, TextInput } from 'react-native';
import Navbar from './Navbar';
import { useState } from 'react';
import { useNavigation } from "@react-navigation/native";

import { firebaseAuth } from "../configs/firebaseConfig.js"
import { updateEmail, updateProfile } from 'firebase/auth';

const Settings = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const navigation = useNavigation();

  // Get user profile data
  const auth = firebaseAuth;
  const user = auth.currentUser;

  const linebreak = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginTop: 8 }}></SafeAreaView>;
  const spacer = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginVertical: 8 }}></SafeAreaView>;

  const changeName = (name) => {
    updateProfile(user, {
      displayName: name
    }).then(() => {
      alert("Name changed");
    })
      .catch(error => {
        console.log(error);
      })
  }

  const changeEmail = (email) => {
    updateEmail(user, email)
      .then(() => {
        alert("Email changed");
      })
      .catch(error => {
        console.log(error);
        alert("Failed to change email")
      })
  }

  const deleteAccount = () => {
    user.delete()
      .then(() => {
        // User deleted.
        console.log("User Account Deleted Successful");
      })
      .catch((error) => {
        console.log(error);
      });

    navigation.navigate("Login");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={{ fontSize: 25, fontWeight: '600' }}>{user.displayName}'s Settings</Text>
        </View>
        {linebreak}
        <View style={styles.settings}>
          <Text style={styles.text}>
            You can contact us through email: {"\n"}
            "support@moneymanaged.com"
          </Text>

          <TextInput
            style={styles.inputBox}
            placeholder='New Email'
            onChangeText={setEnteredEmail}
            value={enteredEmail}
            autoCapitalize='none'
          />
          <Button title="Change email" onPress={() => changeEmail(enteredEmail)} />

          {spacer}
          <TextInput
            style={styles.inputBox}
            placeholder='New Username'
            onChangeText={setEnteredName}
            value={enteredName}
            autoCapitalize='none'
          />

          <Button title="Change username" onPress={() => changeName(enteredName)} />
          {spacer}
          <Button title="Delete account" onPress={() => deleteAccount()} />
        </View>
        <Navbar />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  settings: {
    flex: 9,
    marginTop: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
  header: {
    padding: 8,
    justifyContent: 'flex-start',
  },
  text: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 400,
    padding: 8,
    textAlign: "center",
  },
  inputBox: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 8,
    height: 40,
    minWidth: '80%',
  },
});

export default Settings;