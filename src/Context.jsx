// // src/AuthContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { onAuthStateChanged } from 'firebase/auth';
// import { auth } from './firebase';

// const AuthContext = createContext();

// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (user) => {
//       setCurrentUser(user);
//     });
//     return unsubscribe;
//   }, []);

//   return (
//     <AuthContext.Provider value={{ currentUser }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// src/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase-config";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
