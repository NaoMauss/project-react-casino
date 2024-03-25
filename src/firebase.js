// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// auth
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

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

const signInWithGoogle = async () => {
  const auth = getAuth(app);
  const result = await signInWithPopup(auth, provider);
  return result;
};

const signOut = async () => {
  const auth = getAuth(app);
  await auth.signOut();
};

export { app, db, auth, signInWithGoogle, signOut };