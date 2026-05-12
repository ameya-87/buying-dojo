import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth, isFirebaseConfigured } from "../firebase";
import { AuthContext } from "./auth-context";

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(() => Boolean(auth));

  useEffect(() => {
    if (!auth) {
      return undefined;
    }

    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const signInWithEmail = (email, password) => {
    if (!auth) {
      throw new Error("Firebase authentication is not configured.");
    }

    return signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = (email, password) => {
    if (!auth) {
      throw new Error("Firebase authentication is not configured.");
    }

    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    if (!auth) {
      throw new Error("Firebase authentication is not configured.");
    }

    return signInWithPopup(auth, googleProvider);
  };

  const signOutUser = () => {
    if (!auth) {
      return Promise.resolve();
    }

    return signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,
        configured: isFirebaseConfigured,
        signInWithEmail,
        signUpWithEmail,
        signInWithGoogle,
        signOut: signOutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
