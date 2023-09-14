import { getApp, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";


let app
try{
  app = getApp()
}catch (error){
  
  const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: '',
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: ""
    };
  
app = initializeApp(firebaseConfig);
}
// Initialize Firebase
export const auth = getAuth();
export const dbb = getFirestore(app);
export const db = getDatabase(app);
export const storage = getStorage();

