import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import Navbar from './Navbar';

import { firebaseAuth } from "../configs/firebaseConfig.js"
import SummarisedBudgets from './SummarisedBudgets.js';

const Home = () => {
  // Get user profile data
  const auth = firebaseAuth;
  const user = auth.currentUser;

  const linebreak = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginTop: 8 }}></SafeAreaView>;

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View>
        <View style={styles.welcomeMessage}>
          <Text style={{fontSize: 25, fontWeight: '800'}}>Welcome {user.displayName}!</Text>
          <Text style={{fontSize: 15, fontStyle: 'italic'}}>If you have any questions, you can reach us from the settings page</Text>
        </View>
        {linebreak}
        <View style={styles.summarisedBudgets}>
          <SummarisedBudgets />
        </View>
        <Navbar />
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeMessage: {
    height: 80,
    padding: 8,
    justifyContent: 'flex-start',
  },
  summarisedBudgets: {
    flex: 9,
    marginTop: 5,
    borderRadius: 10,
    justifyContent: 'flex-start',
  },
});
 
export default Home;