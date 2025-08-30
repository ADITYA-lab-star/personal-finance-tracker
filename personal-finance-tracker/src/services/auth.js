// src/services/auth.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase";

export async function signUpWithEmail({
  fullName,
  email,
  password,
}) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  if (fullName) await updateProfile(cred.user, { displayName: fullName });
  return cred.user;
}

export function signInWithEmail(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signInWithGoogle() {
  return signInWithPopup(auth, googleProvider);
}

export function logout() {
  return signOut(auth);
}
