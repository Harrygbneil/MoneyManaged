import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

import CreateNewBudget from "./CreateNewBudget";

const spendingHabits = [
  {title: 'High'},
  {title: 'Average'},
  {title: 'Low'}
];

const NewBudget = () => {
  // Get user profile data
  const route = useRoute()
  const user = route.params.user;

  const navigation = useNavigation();
  const linebreak = <View style={{height: 10}}></View>

  // User inputs
  const [spendingHabit, setSpendingHabit] = useState('');
  const [income, setIncome] = useState('');
  const [rentOrBills, setRentOrBills] = useState('');
  const [groceries, setGroceries] = useState('');
  const [insurance, setInsurance] = useState('');
  const [other, setOther] = useState('');
  const data = [income, rentOrBills, groceries, insurance, other]

  const [successful, setSuccessful] = useState(false);

  // Validate money input
  const moneyRegex = /^(\d*)([\.]{0,1})(\d{0,2})$/;
  const ValidateInput = (input, type) => {
    if(moneyRegex.test(input)){
      type == 'income' ? setIncome(input) : {}
      type == 'rent/bills' ? setRentOrBills(input) : {}
      type == 'groceries' ? setGroceries(input) : {}
      type == 'insurance' ? setInsurance(input) : {}
      type == 'other' ? setOther(input) : {}
    }
  }

  // Final check
  const finalRegexCheck = /^(\D{0})(\d+)([\.]{1})(\d{2})$/;
  const finalCheck = (data, spendingHabit) => {
    setSuccessful(true)
    data.forEach(input => {
      if(!finalRegexCheck.test(input)) {
        setSuccessful(false)
        alert('Please ensure all data is in the format "00.00"')
      }
    });
    if(spendingHabit === '') {
      setSuccessful(false)
      alert('Please ensure your spending habit is selected')
    }
    if(successful){
      CreateNewBudget(data, spendingHabit);
    }
  }

  return (
    <SafeAreaView style={styles.newBudgetContainer}>
      <View>
        <View style={styles.newBudgetHeader}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Budget info</Text>
          <Button title="Cancel" onPress={() => navigation.navigate('Budgets', { user: user })}/>
        </View>
        <View style={styles.newBudget}>
          <Text style={{fontStyle: 'italic', fontSize: 15}}>
            Please enter all of your info honestly based on a monthly timeframe. 
            Your data will not be sold to anyone or used for any purposes unrelated to this app
          </Text>
          {linebreak}
          <View style={styles.inputContainer}>
            <Text style={{fontSize: 15, fontWeight: '500'}}>Income after tax</Text>
            <TextInput 
              style={styles.inputBox} 
              placeholder='0.00' 
              keyboardType='numeric'
              onChangeText={input => ValidateInput(input, 'income')}
              value={income}
            />
            <Text style={{fontSize: 15, fontWeight: '500'}}>Rent and/or bills</Text>
            <TextInput 
              style={styles.inputBox} 
              placeholder='0.00' 
              keyboardType='numeric'
              onChangeText={input => ValidateInput(input, 'rent/bills')}
              value={rentOrBills}
            />
            <Text style={{fontSize: 15, fontWeight: '500'}}>Groceries</Text>
            <TextInput 
              style={styles.inputBox} 
              placeholder='0.00' 
              keyboardType='numeric'
              onChangeText={input => ValidateInput(input, 'groceries')}
              value={groceries}
            />
            <Text style={{fontSize: 15, fontWeight: '500'}}>Insurance</Text>
            <TextInput 
              style={styles.inputBox} 
              placeholder='0.00' 
              keyboardType='numeric'
              onChangeText={input => ValidateInput(input, 'insurance')}
              value={insurance}
            />
            <Text style={{fontSize: 15, fontWeight: '500'}}>Other necesseties</Text>
            <TextInput 
              style={styles.inputBox} 
              placeholder='0.00' 
              keyboardType='numeric'
              onChangeText={input => ValidateInput(input, 'other')}
              value={other}
            />
            <Text style={{fontSize: 15}}>Spending habits: </Text>
            <SelectDropdown
              data={spendingHabits}
              onSelect={item => {
                setSpendingHabit(item.title)
              }}
              renderButton={item => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    <Text style={styles.dropdownTxtStyle}>
                      {(item && item.title) || 'Unselected'}
                    </Text>
                  </View>
                )
              }}
              renderItem={(item, isSelected) => {
                return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#ffffff'})}}>
                    <Text style={styles.dropdownTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              dropdownStyle={styles.dropdownMenuStyle} 
            />
            <Button title="Create budget" onPress={() => finalCheck(data, spendingHabit)}/>
          </View>
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
  dropdownButtonStyle: {
    maxWidth: '25%',
    height: 40,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginVertical: 10,
  },
  dropdownTxtStyle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#000000',
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownMenuStyle: {
    borderRadius: 10,
    backgroundColor: '#ffffff',
  },
});

export default NewBudget;