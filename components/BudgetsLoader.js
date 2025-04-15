import { FlatList, SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from "react-native";
import { firebaseAuth, firebaseDB } from "../configs/firebaseConfig";
import { collection, query, getDocs, } from "firebase/firestore";
import { useState } from "react";

const BudgetsLoader = () => {
  const [loading, setLoading] = useState(true);
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
      DATA[dataPos] = doc.data();
      dataPos++;
    })

    setLoading(false);
  })();

  const renderItem = ({item}) => ( 
    <BudgetItem 
      income={item.income}
    /> 
  );
  const BudgetItem = ({income}) => {
    return(
      <View style={styles.item}>
        <Text>{income}</Text>
      </View>
    )
  };

  return (  
    <SafeAreaView style={styles.container}>
      {/* Show loading indicator while fetching budgets */}
      {loading ? (<ActivityIndicator size='large' color='#0000ff'/>) : 
      (<FlatList data={DATA} renderItem={renderItem} keyExtractor={item => item.id}/>)}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  item: {
    backgroundColor: '#52FFB8',
    padding: 20,
    borderRadius: 10,
    marginVertical: 8,
    marginHorizontal: 4,
    flex: 1,
  },
});

export default BudgetsLoader;