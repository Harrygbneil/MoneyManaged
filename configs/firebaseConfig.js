// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyDnHfPgC3YjT1MA2VA6qMHPg6KNXqjICsg",
  authDomain: "moneymanaged-eb59a.firebaseapp.com",
  projectId: "moneymanaged-eb59a",
  storageBucket: "moneymanaged-eb59a.firebasestorage.app",
  messagingSenderId: "1058757900031",
  appId: "1:1058757900031:web:648c020502189b56653eca",
  measurementId: "G-ZPKPD55ZF5",
  databaseURL: "https://moneymanaged-eb59a-default-rtdb.europe-west1.firebasedatabase.app/",
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const firebaseDB = getFirestore(firebaseApp);