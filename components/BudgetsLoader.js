import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { firebaseAuth, firebaseDB } from "../configs/firebaseConfig";
import { collection, query, getDocs, } from "firebase/firestore";
import { useState } from "react";

const BudgetsLoader = () => {
  const [loading, setLoading] = useState(true);
  const [budgets, setBudgets] = useState(false);
  // Define data as an array (budgets)
  let DATA = [];

  // Connect to firebase
  const db = firebaseDB;
  const auth = firebaseAuth;
  const user = auth.currentUser;

  const collectionRef = collection(db, 'users', user.uid, 'budgets');

  // Get budgets
  (async () => {
    // Add budgets to DATA
    let dataPos = 0;
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach(doc => {
      setBudgets(true);
      DATA[dataPos] = doc.data();
      dataPos++;
    })

    setLoading(false);
  })();

  const renderItem = ({ item }) => (
    <BudgetItem
      income={item.income}
      left={item.left}
      groceries={item.groceries}
      insurance={item.insurance}
      rob={item.rentOrBills}
      other={item.other}
    />
  );
  const BudgetItem = ({ income, left, groceries, insurance, rob, other }) => {
    if (left / income > 0.3) {
      return (
        <View style={styles.itemContainerGreat}>
          <View style={styles.item}>
            <Text style={styles.itemText}>income: £{income / 100}</Text>
            <Text style={styles.itemText}>groceries: £{groceries / 100}</Text>
            <Text style={styles.itemText}>insurance: £{insurance / 100}</Text>
            <Text style={styles.itemText}>rent/bills: £{rob / 100}</Text>
            <Text style={styles.itemText}>other: £{other / 100}</Text>
            <Text style={styles.itemText}>left: £{left / 100}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>You have a significant amount leftover, you are doing very well!</Text>
          </View>
        </View>
      )
    }
    else if (left / income > 0.03) {
      return (
        <View style={styles.itemContainerGood}>
          <View style={styles.item}>
            <Text style={styles.itemText}>income: £{income / 100}</Text>
            <Text style={styles.itemText}>groceries: £{groceries / 100}</Text>
            <Text style={styles.itemText}>insurance: £{insurance / 100}</Text>
            <Text style={styles.itemText}>rent/bills: £{rob / 100}</Text>
            <Text style={styles.itemText}>other: £{other / 100}</Text>
            <Text style={styles.itemText}>left: £{left / 100}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>You are doing well, but perhaps try cutting back a little more</Text>
          </View>
        </View>
      )
    }
    else {
      return (
        <View style={styles.itemContainerBad}>
          <View style={styles.item}>
            <Text style={styles.itemText}>income: £{income / 100}</Text>
            <Text style={styles.itemText}>groceries: £{groceries / 100}</Text>
            <Text style={styles.itemText}>insurance: £{insurance / 100}</Text>
            <Text style={styles.itemText}>rent/bills: £{rob / 100}</Text>
            <Text style={styles.itemText}>other: £{other / 100}</Text>
            <Text style={styles.itemText}>left: £{left / 100}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemText}>
              You are not doing well, please revise your spending immediatly.
              We recommend reduving the amount you spend on leisure and minimise your grocery hauls.
              Financial stablility comes before fun.
            </Text>
          </View>
        </View>
      )
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Show message if no budgets */}

      {
        !budgets &&
        <View>
          <Text style={styles.noBudgetText}>No budgets!</Text>
          <Text style={styles.verifyText}>
            Click the 'New Budget' button to create one
          </Text>
        </View>
      }

      {/* Show loading indicator while fetching budgets */}

      {
        loading ? (<ActivityIndicator size='large' color='#0000ff' />) :
          (<FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id} />)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainerGreat: {
    backgroundColor: '#77ff77',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemContainerGood: {
    backgroundColor: '#ffff77',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  itemContainerBad: {
    backgroundColor: '#ff7777',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  item: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  itemText: {
    fontSize: 18,
    fontWeight: 500,
  },
  pieContainer: {
    justifyContent: 'center',
    flex: 2
  },
  textContainer: {
    justifyContent: 'center',
    flex: 3
  },
  text: {
    fontSize: 20,
    fontWeight: 500,
  },
  noBudgetText: {
    fontSize: 25,
    fontWeight: 500,
    alignSelf: 'center',
  },
  verifyText: {
    fontSize: 20,
    fontWeight: 400,
    fontStyle: 'italic',
    alignSelf: 'center',
  }
});

export default BudgetsLoader;