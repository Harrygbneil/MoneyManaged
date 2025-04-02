import { SafeAreaView, View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Navbar from "./Navbar";
import { firebaseAuth } from "../configs/firebaseConfig.js"

const Budgets = () => {
  // Get user profile data
  const auth = firebaseAuth;
  const user = auth.currentUser;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.budgetsContainer}>
      <View>
        <View style={styles.budgetHeader}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Budgets</Text>
          <Button title="New budget" onPress={() => navigation.navigate('NewBudget')}/>
        </View>
        <View style={styles.budgets}>
          <Text>test to see if user data is carried</Text>
          <Text>{user.displayName}</Text>
        </View>
        <Navbar />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  budgetsContainer: {
    flex: 1,
    padding: 5,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  budgets: {
    flex: 9,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#FECDAA'
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
});
 
export default Budgets;