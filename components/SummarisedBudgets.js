import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { firebaseAuth, firebaseDB } from "../configs/firebaseConfig";
import { collection, query, getDocs, } from "firebase/firestore";
import { useState } from "react";
import PieChart from 'react-native-pie-chart'

const SummarisedBudgets = () => {
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

  const renderItem = ({item}) => ( 
    <BudgetItem 
      income={item.income}
      left={item.left}
      groceries={item.groceries}
      insurance={item.insurance}
      rob={item.rentOrBills}
      other={item.other}
    /> 
  );

  const BudgetItem = ({income, left, groceries, insurance, rob, other}) => {
    //Set pie chart data
    const widthAndHeight = 100;
    const series = [
      { value: rob, color: '#ff7777'},
      { value: insurance+other+groceries, color: '#ffff77'},
      { value: left > 0 ? left : 0, color: '#77ff77'},
    ]

    // Currency formatter
    let format = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    });

    return(
      <View style={styles.item}>
        {/* Check if leftover < 0 */}
        {
        left > 0 ?
        (
        <>
          <View style={styles.pieContainer}>
            <PieChart 
              widthAndHeight={widthAndHeight} 
              series={series}
              padAngle={0.05}
              cover={{radius: 0.55}}  
            />
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text]}>Income: {format.format(income/100)}</Text>
            <Text style={[styles.text, {color: '#ff7777'}]}>Rent/Bills: {format.format(rob/100)}</Text>
            <Text style={[styles.text, {color: '#ffff77'}]}>Expenditures: {format.format((groceries + insurance + other)/100)}</Text>
            <Text style={[styles.text, {color: '#77ff77'}]}>Leftover: {format.format(left/100)}</Text>
          </View>
        </>) :
        (
        <>
          <View style={[styles.textContainer, {backgroundColor: '#ff7777', padding: 8, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between'}]}>
            <View style={{flex: 1}}>
              <Text style={[styles.text]}>Income: {format.format(income/100)}</Text>
              <Text style={[styles.text]}>Rent/Bills: {format.format(rob/100)}</Text>
              <Text style={[styles.text]}>Expenditures: {format.format((groceries + insurance + other)/100)}</Text>
              <Text style={[styles.text]}>Leftover: {format.format(left/100)}</Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={[styles.text]}>You have no leftover money with this plan, see budgets page for more details</Text>
            </View>
          </View>
        </>)
        }
      </View>
    )
  };

  return (  
    <SafeAreaView style={styles.container}>
      {/* Show message if no budgets */}

      {
      !budgets && 
      <View>
        <Text style={styles.noBudgetText}>No budgets!</Text>
        <Text style={styles.verifyText}>
          Verify your email and create a budget on the budgets page 
          to view a summarised version here
        </Text>
      </View>
      }

      {/* Show loading indicator while fetching budgets */}

      {
      loading ? (<ActivityIndicator size='large' color='#0000ff'/>) : 
      (<FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/>)
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#909090',
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pieContainer: {
    justifyContent: 'center',
    flex: 2,
    alignItems: 'center'
  },
  textContainer: {
    justifyContent: 'center',
    flex: 3
  },
  text: {
    fontSize: 18,
    fontWeight: 600,
    alignSelf: 'center',
    margin: 2
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

export default SummarisedBudgets;