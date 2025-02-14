import { SafeAreaView, View, StyleSheet, Text, Button } from "react-native";
import { useRoute } from "@react-navigation/native";

import Navbar from "./Navbar";

const Profile = () => {
  // Get user profile data
  const route = useRoute();
  const user = route.params.user;
  
  return (  
    <SafeAreaView style={styles.profileContainer}>
      <View>
        <View style={styles.profileDetails}>
          <Text>{user.displayName}'s Profile</Text>
        </View>
        <Navbar user={user}/>
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
    flex: 9,
    marginTop: 15,
    padding: 8,
    borderRadius: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#FECDAA'
  },
});
 
 
export default Profile;