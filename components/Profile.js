import { SafeAreaView, View, StyleSheet, Text, Button } from "react-native";

import Navbar from "./Navbar";
import { firebaseAuth } from "../configs/firebaseConfig";
import { useNavigation } from "@react-navigation/native";

const Profile = () => {
  // Get user profile data
  const auth = firebaseAuth;
  const user = auth.currentUser;
  const navigation = useNavigation();

  const linebreak = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginTop: 8 }}></SafeAreaView>;

  const logOut = () => {
    auth.signOut();
    navigation.navigate("Login");
  }
  return (
    <SafeAreaView style={styles.profileContainer}>
      <View>
        <View style={styles.profileDetails}>
          <View style={styles.profileHead}>
            <Text style={{ fontSize: 25, fontWeight: '600' }}>{user.displayName}'s Profile</Text>
          </View>
          {linebreak}
          <View style={styles.info}>
            <Text style={styles.infoText}>
              Email: {"\n" + user.email}
            </Text>
            <Text style={styles.infoText}>
              Email Verified: {(user.emailVerified) ? "\nYes" : "\nNo"}
            </Text>
            <Text style={styles.infoText}>
              Username: {"\n" + user.displayName}
            </Text>
            <Text style={styles.infoText}>
              Your Unique ID: {"\n" + user.uid}
            </Text>

            <Button title="Log out" onPress={() => logOut()} />
          </View>
        </View>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileDetails: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  profileHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  info: {
    padding: 15,
    marginVertical: 8,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  infoText: {
    marginBottom: 15,
    fontSize: 20,
    fontWeight: 400,
    backgroundColor: "#c0c0c0",
    borderRadius: 10,
    padding: 8,
  }
});


export default Profile;