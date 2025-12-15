import { SafeAreaView, View, StyleSheet, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Navbar from "./Navbar";
import BudgetsLoader from "./BudgetsLoader.js";

const Budgets = () => {
  const navigation = useNavigation();

  const linebreak = <SafeAreaView style={{ borderWidth: 1, backgroundColor: '#000000', marginTop: 8 }}></SafeAreaView>;

  return (
    <SafeAreaView style={styles.budgetsContainer}>
      <View>
        <View style={styles.budgetHeader}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Budgets</Text>
          <Button title="New budget" onPress={() => navigation.navigate('NewBudget')}/>
        </View>
        {linebreak}
        <View style={styles.budgets}>
          <BudgetsLoader />
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
    borderRadius: 10,
  },
  budgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
});
 
export default Budgets;