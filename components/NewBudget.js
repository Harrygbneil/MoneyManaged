import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, View, Text, StyleSheet, Button, TextInput } from "react-native";
import { useState } from "react";

import { setDoc, doc, collection, query, getDocs } from "firebase/firestore";
import { firebaseDB, firebaseAuth } from "../configs/firebaseConfig.js";

const NewBudget = () => {
  // Get user profile data
  const auth = firebaseAuth;

  const navigation = useNavigation();
  const linebreak = <View style={{height: 10}}></View>

  // User inputs
  const [income, setIncome] = useState('');
  const [rentOrBills, setRentOrBills] = useState('');
  const [groceries, setGroceries] = useState('');
  const [insurance, setInsurance] = useState('');
  const [other, setOther] = useState('');
  const data = [income, rentOrBills, groceries, insurance, other]

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
  const finalCheck = async (data, spendingHabit) => {
    let successful = true;
    await data.forEach(input => {
      if(!finalRegexCheck.test(input)) {
        alert('Please ensure all data is in the format "00.00"');
        successful = false;
      }
    })

    if (successful) {
      CreateNewBudget(data, spendingHabit);
    }
  }

  return (
    <SafeAreaView style={styles.newBudgetContainer}>
      <View>
        <View style={styles.newBudgetHeader}>
          <Text style={{fontSize: 25, fontWeight: '600'}}>Budget info</Text>
          <Button title="Cancel" onPress={() => navigation.navigate('Budgets')}/>
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
            <Button title="Create budget" onPress={() => finalCheck(data)}/>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const CreateNewBudget = (data) => {
  // Require md5 package
  var md5 = require('md5');

  // Connect to firebase
  const db = firebaseDB;
  const auth = firebaseAuth;
  const user = auth.currentUser;

  // Define user inputs as seperate variables
  const income = data[0];
  const rentOrBills = data[1];
  const groceries = data[2];
  const insurance = data[3];
  const other = data[4];

  // Define hash (Budget ID)
  const all = income + rentOrBills + groceries + insurance + other
  const hash = md5(user.uid + all)

  // Retrieve user doc
  const collectionRef = collection(db, 'users', user.uid, 'budgets');

  // Check if max budgets reached and if alread exists (self-invoking async function)
  (async () => {
    let successful = true;
    let count = 0;

    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    
    querySnapshot.forEach(doc => {
      count++;
      if (count >= 5) {
        alert('Max budgets reached');
        successful = false;
      }
      if (checkBudgetID(doc.id)){
        alert('Budget already exists');
        successful = false;
      }
    });

    // Add budget to db if it passes all checks
    if (successful) {
      const docData = setDocData();
      setDoc(doc(collectionRef, hash), docData)
      .then(() => {
        alert('Budget created successfully!');
      })
      .catch(error => {
        console.error(error);
      })
    }
  })();

  // Check if budget already exists
  const checkBudgetID = id => {
    if (id === hash) {
      return true;
    }
    return false;
  }

   // Set budget to be added
  const setDocData = () => {
    // Budget math
    const n = Number;
    const incN = n(income)*100; 
    const rentN = n(rentOrBills)*100;
    const groceriesN = n(groceries)*100;
    const insuranceN = n(insurance)*100;
    const otherN = n(other)*100;
    console.log(incN, rentN, groceriesN, insuranceN, otherN);

    const left = incN - rentN - groceriesN - insuranceN - otherN;

    // Set budget to be added
    let docData = {
      income: incN,
      rentOrBills: rentN,
      groceries: groceriesN,
      insurance: insuranceN,
      other: otherN,

      left: left,
    }

    return docData;
  }
};

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
});

export default NewBudget;