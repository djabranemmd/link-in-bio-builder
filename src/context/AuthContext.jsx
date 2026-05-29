import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../lib/firebase";

const AuthContext =
  createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({
  children,
}) {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  async function signup(
    email,
    password
  ) {
    return createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  async function login(
    email,
    password
  ) {
    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  }

  function logout() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, []);

  const value = {
    user,
    signup,
    login,
    logout,
  };

  return (
    <AuthContext.Provider
      value={value}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}