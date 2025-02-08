import { StyleSheet, Text, SafeAreaView, View } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Navbar from './Navbar';

const Home = () => {
  // Get user profile data
  const route = useRoute();
  const user = route.params.user;

  return (
    <SafeAreaView style={styles.homeContainer}>
      <View>
        <View style={styles.welcomeMessage}>
          <Text style={{fontSize: 20, fontWeight: '600', color: 'white'}}>Welcome {user.displayName}!</Text>
          <Text style={{fontSize: 15, fontStyle: 'italic', color: 'white'}}>If you have any questions, you can reach us from the settings page</Text>
        </View>
        <View style={styles.summarisedBudgets}>
          <Text>No budgets!</Text>
          {/* This will contain summarised goals */}
        </View>
        <Navbar user={user}/>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  welcomeMessage: {
    height: 80,
    padding: 8,
    justifyContent: 'flex-start',
    borderRadius: 10,
    backgroundColor: '#6A6B83',
    borderColor: '#6A6B83'
  },
  summarisedBudgets: {
    flex: 9,
    marginTop: 15,
    padding: 8,
    borderRadius: 10,
    justifyContent: 'flex-start',
    backgroundColor: '#FECDAA'
  },
});
 
export default Home;