import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "@/firebase";

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  const auth = getAuth(app);
  const result = await signInWithPopup(auth, provider);
  return result;
};