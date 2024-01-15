import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";




/**
 * Log out the current user.
 * @returns {boolean} - Returns true if logout is successful, false otherwise
 */
export async function logOut(navigation) {
  try {
    await auth.signOut();
    navigation.navigate("Authentication");
    
  } catch (error) {
    console.error("Error signing out: ", error);
    return false;
  }
}
