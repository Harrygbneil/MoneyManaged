import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, Button } from "react-native";

const NewBudget = () => {
  // Get user profile data
  const route = useRoute()
  const user = route.params.user;

  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.newBudgetContainer}>
      <View>
        <View style={styles.newBudgetHeader}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Create new budget</Text>
          <Button title="Cancel" onPress={() => navigation.navigate('Budgets', { user: user })}/>
        </View>
        <View style={styles.newBudget}>
          <Text>{user.uid}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newBudgetContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  newBudgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    padding: 8,
  },
  newBudget: {
    flex: 9,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#FECDAA',
    minWidth: '100%',
    maxWidth: '100%',
  },
});

export default NewBudget;