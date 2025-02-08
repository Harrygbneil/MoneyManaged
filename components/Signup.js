import { useState } from "react";
import { SafeAreaView, Text, TextInput, StyleSheet, View, ActivityIndicator, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebaseAuth, firebaseDB } from "../configs/firebaseConfig.js";
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

const Signup = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredUserName, setEnteredUserName] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginPressed, setLoginPressed] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);

  const auth = firebaseAuth;
  const db = firebaseDB;
  const navigation = useNavigation();

  const signUp = async (email, pass, userName) => {
    setLoading(true);

    // Attempt to create a new user with firebase auth
    // If succesful then call setUserProfile
    // Else alert user there was an error and set Loading to false 
    await createUserWithEmailAndPassword(auth, email, pass)
    .then(() => setUserProfile(userName, email, auth.currentUser.uid))
    .catch(error => {
      console.error(error.message); 
      alert('Sign up failed, please ensure a valid email and password');
      setLoading(false);
    })
  };

  const setUserProfile = async (userName, email, uid) => {
    // Add user to db with docId as the auth uid
    setDoc(doc(db, "users", uid), {
      email: email,
      userName: userName
    })
    .catch(error => {
      console.error("Error adding document: ", error)
    })

    // Set user displayName as username
    await updateProfile(auth.currentUser, { displayName: userName })

    // Send email verification, account must be verified in order to make budgets
    await sendEmailVerification(auth.currentUser)
    .catch(error =>
      console.error(error.message)
    )
    .finally(() => setLoading(false))

    // Send user to login to inform them of the email
    navigation.navigate('Login');
    alert('Thank you for signing up! A verification email has been sent');
  };

  return (  
    <SafeAreaView style={styles.signUpContainer}>
      <Text style={{fontSize: 60, textAlign: 'center', marginBottom: 10}}>Sign up</Text>
      <View style={styles.inputBoxContainer}>
        <TextInput style={styles.inputBox} placeholder='Username' onChangeText={setEnteredUserName} value={enteredUserName}></TextInput>
        <TextInput style={styles.inputBox} placeholder='Email' onChangeText={setEnteredEmail} value={enteredEmail}></TextInput>
        <TextInput style={styles.inputBox} placeholder='Password' onChangeText={setEnteredPassword} value={enteredPassword}></TextInput>
        <Text style ={styles.passwordText}>Min 8 characters long, At least 1 special character, 1 number and 1 uppercase character</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPressIn={() => setSignupPressed(true)} 
          onPressOut={() => {
            signUp(enteredEmail, enteredPassword, enteredUserName)
            setSignupPressed(false)
          }} 
          style={() => signupPressed ? styles.pressedPressable : styles.pressable} 
        >
          <Text style={styles.pressableText}>Sign up</Text>
        </Pressable>
        <Pressable
          onPressIn={() => setLoginPressed(true)} 
          onPressOut={() => {
            navigation.navigate('Login')
            setLoginPressed(false)
          }} 
          style={() => loginPressed ? styles.pressedPressable : styles.pressable} 
        >
          <Text style={styles.pressableText}>Return to login</Text>
        </Pressable>
      </View>
      {/* Show loading indicator while attempting signup */}
      {loading ? (<ActivityIndicator size='large' color='#0000ff'/>) : (<></>)}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  signUpContainer: {  
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  inputBoxContainer: {
    margin: 5
  },
  inputBox: {
    borderRadius: 5,
    borderWidth: 1,
    margin: 10,
    padding: 8,
    height: 40,
    minWidth: '80%',
  },
  passwordText: {
    marginHorizontal: 15,
    minWidth: '80%',
    fontStyle: 'italic',
    fontSize: 13,
  },
  buttonContainer: {
    marginTop: 10,
    alignSelf: 'center',
  },
  pressable: {
    backgroundColor: '#DF2935',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    minWidth: '70%',
    alignSelf: 'center',
  },
  pressedPressable: {
    backgroundColor: '#e7626a',
    borderRadius: 10,
    margin: 8,
    padding: 10,
    minWidth: '70%',
    alignSelf: 'center',
  },
  pressableText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 20
  }
});
 
export default Signup;