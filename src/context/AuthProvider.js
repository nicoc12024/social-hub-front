import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState, createContext } from "react";
import { auth } from "../firebase";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    authUser: null,
    loading: true,
    userId: null,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthState({ authUser: user, loading: false, userId: user.uid });
      } else {
        setAuthState({ authUser: null, loading: false, userId: null });
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthContext.Provider value={authState}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
