import { setDoc, doc } from "firebase/firestore";
import { firebaseDB, firebaseAuth } from "../configs/firebaseConfig.js";

const CreateNewBudget = async (data, spendingHabit) => {
  // Connect to firebase
  const db = firebaseDB;
  const auth = firebaseAuth;
  const user = auth.currentUser;

  const docData = {
    budget: {
      userInputs: {
        income: data[0],
        rentOrBills: data[1],
        groceries: data[2],
        insurance: data[3],
        other: data[4],
        spendHabits: spendingHabit
      }
    }
  }

  console.log(docData)
  
  const docRef = doc(db, 'users', user.uid)
  setDoc(docRef, docData, { merge: true })
  .then(() => {
    alert('Budget created successfully!');
  })
  .catch(error => {
    console.error(error);
  })
}
 
export default CreateNewBudget;