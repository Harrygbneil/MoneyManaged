import { useState } from "react";
import { SafeAreaView, Text, TextInput, StyleSheet, Pressable, View, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebaseAuth } from "../configs/firebaseConfig.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [loginPressed, setLoginPressed] = useState(false);
  const [signupPressed, setSignupPressed] = useState(false);

  const auth = firebaseAuth;
  const navigation = useNavigation();

  const signIn = async (email, pass) => {
    setLoading(true);

    // Attempt to sign in with given email and pass
    // If successful, get user data and navigate to Home with user data as a paramater
    // Else, Alert user to check they inputted their email/pass correctly
    await signInWithEmailAndPassword(auth, email, pass)
    .then(userCredential => {
      const user = userCredential.user;
      navigation.navigate('Home', { user: user });
    })
    .catch(error => {
      console.log(error.message);
      alert("Sign in failed, check your email and or password")
    })
    .finally(() => setLoading(false))
  };

  return (  
    <SafeAreaView style={styles.loginContainer}>
      <Text style={{fontSize: 60, textAlign: 'center', marginBottom: 10}}>Login</Text>
      <View style={styles.inputBoxContainer}>
        <TextInput style={styles.inputBox} placeholder='Email' onChangeText={setEnteredEmail} value={enteredEmail}></TextInput>
        <TextInput style={styles.inputBox} placeholder='Password' onChangeText={setEnteredPassword} value={enteredPassword}></TextInput>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          onPressIn={() => setLoginPressed(true)} 
          onPressOut={() => {
            signIn(enteredEmail, enteredPassword)
            setLoginPressed(false)
          }} 
          style={() => loginPressed ? styles.pressedPressable : styles.pressable}
        >
          <Text style={styles.pressableText}>Login</Text>
        </Pressable>
        <Pressable
          onPressIn={() => setSignupPressed(true)} 
          onPressOut={() => {
            navigation.navigate('Signup')
            setSignupPressed(false)
          }} 
          style={() => signupPressed ? styles.pressedPressable : styles.pressable}
        >
          <Text style={styles.pressableText}>Go to Signup</Text>
        </Pressable>
      </View>
      {/* Show loading indicator while attempting Login */}
      {loading ? (<ActivityIndicator size='large' color='#0000ff'/>) : (<></>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginContainer: {  
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

export default Login;