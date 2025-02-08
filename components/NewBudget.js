import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, View, ScrollView, Text, StyleSheet, Button, TextInput } from "react-native";
import CheckBox from "@react-native-community/checkbox";
import { useState, useEffect } from "react";


const NewBudget = () => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false)

  // Get user profile data
  const route = useRoute()
  const user = route.params.user;

  const navigation = useNavigation();
  const linebreak = <View style={{height: 10}}></View>

  return (
    <SafeAreaView style={styles.newBudgetContainer}>
      <View>
        <View style={styles.newBudgetHeader}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Budget info</Text>
          <Button title="Cancel" onPress={() => navigation.navigate('Budgets', { user: user })}/>
        </View>
        <ScrollView style={styles.newBudget}>
          <Text style={{fontStyle: 'italic', fontSize: 15}}>Please enter all of your info honestly</Text>
          <Text style={{fontStyle: 'italic', fontSize: 15}}>Your data will not be sold to anyone or used for any purposes unrelated to this app</Text>
          <Text style={{fontStyle: 'italic', fontSize: 15}}>Please input these based on a monthly timeframe</Text>
          {linebreak}
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputBox} placeholder='Income after tax' keyboardType='numeric'></TextInput>
            <TextInput style={styles.inputBox} placeholder='Rent' keyboardType='numeric'></TextInput>
            <TextInput style={styles.inputBox} placeholder='Bills' keyboardType='numeric'></TextInput>
            <TextInput style={styles.inputBox} placeholder='Groceries' keyboardType='numeric'></TextInput>
            <TextInput style={styles.inputBox} placeholder='Insurance' keyboardType='numeric'></TextInput>
            <TextInput style={styles.inputBox} placeholder='Other necesseties ' keyboardType='numeric'></TextInput>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  newBudgetContainer: {
    flex: 1,
    padding: 5,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  newBudgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  newBudget: {
    flex: 9,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#FECDAA',
    minWidth: '100%',
  },
  inputContainer: {
    margin: 5,
    minHeight: '100%',
  },
  inputBox: {
    borderRadius: 5,
    borderWidth: 2,
    marginVertical: 10,
    padding: 8,
    height: 40,
    maxWidth: '75%'
  },
  checkbox: {
    alignSelf: 'center',
  },
});

export default NewBudget;