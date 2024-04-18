// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// auth
import { getAuth, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { doc, setDoc, getFirestore, addDoc, getDoc, collection } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSiBn4VNagOR1odbEbNVLeuwnrYKbOzao",
  authDomain: "casino-ce8df.firebaseapp.com",
  projectId: "casino-ce8df",
  storageBucket: "casino-ce8df.appspot.com",
  messagingSenderId: "232003016921",
  appId: "1:232003016921:web:d4228707af6a610f2e86c8",
  measurementId: "G-1BYW1RQEKY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const redirectTo = () => {
  window.location.href = "/";
};

const getInfoFromDb = async () => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  const uid = user.uid;

  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (!db) {
    return("db is not defined")
  }

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

const signInWithGoogle = async () => {
  try {
    const auth = getAuth(app);
    await setPersistence(auth, browserLocalPersistence);
    const result = await signInWithPopup(auth, provider);
    redirectTo();
    return result;
  } catch (error) {
    console.error("failed to sign In", error);
  }
};


const signOut = async () => {
  const auth = getAuth(app);
  await auth.signOut();
};

const checkAuth = async () => {
  const auth = getAuth(app);
  const user = await auth.currentUser;
  if (user) {
    redirectTo();
  }
};

const addDataToDb = async () => {
  try {
    const auth = getAuth(app);
    const user = auth.currentUser;
    if (!user) {
      return;
    }
    const uid = user.uid;

    // check if document exists
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document already exists");
      return;
    }

    // add document

    const usersInfo = {
      uid: uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      balance: 1000,
    };

    const userRef = doc(db, "users", uid);
    await setDoc(userRef, usersInfo, { merge: false });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

const getBalance = async () => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    return;
  }

  const uid = user.uid;
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  if (!db) {
    return("db is not defined")
  }

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    const data = docSnap.data();
    console.log("Inside getBalance: ", data.balance);

    // if (!data.balance) {
    //   await setDoc(docRef, { balance: 1000 }, { merge: true });
    //   return 1000;
    // }

    const balance = data.balance;
    return balance;
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

const updateBalance = async (amount) => {
  const auth = getAuth(app);
  const user = auth.currentUser;

  if (!user) {
    console.error("No user logged in.");
    return "No user logged in";
  }

  if (!db) {
    console.error("DB is not defined.");
    return "DB is not defined";
  }

  const uid = user.uid;
  const docRef = doc(db, "users", uid);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const currentData = docSnap.data();
      await setDoc(docRef, { balance: amount }, { merge: true });
      console.log("Updated balance to:", amount);
      return amount; // Return the updated balance
    } else {
      console.log("No such document exists to update.");
      return "No such document";
    }
  } catch (error) {
    console.error("Failed to update balance:", error);
    return error.message; // Provide error message back to caller
  }
}



export { app, db, auth, signInWithGoogle, signOut, checkAuth, getInfoFromDb, addDataToDb, getBalance, updateBalance };