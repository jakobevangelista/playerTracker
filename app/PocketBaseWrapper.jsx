"use client";

import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from "react";
import PocketBase from "pocketbase";

const BASE_URL = "https://backend.jakobevangelista.com:443";

const PocketContext = createContext({});

export const PocketProvider = ({ children }) => {
  const pb = useMemo(() => new PocketBase(BASE_URL), []);

  const [token, setToken] = useState(pb.authStore.token);
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    return pb.authStore.onChange((token, model) => {
      setToken(token);
      setUser(model);
    });
  }, []);

  const register = useCallback(async (email, password) => {
    return await pb
      .collection("users")
      .create({ email, password, passwordConfirm: password });
  }, []);

  const login = useCallback(async (email, password) => {
    return await pb.collection("users").authWithPassword(email, password);
  }, []);

  const logout = useCallback(() => {
    pb.authStore.clear();
  }, []);

  return (
    <PocketContext.Provider
      value={{ register, login, logout, user, token, pb }}
    >
      {children}
    </PocketContext.Provider>
  );
};

export const usePocket = () => useContext(PocketContext);

// import { createContext, useState } from "react";
// import Pocketbase from "pocketbase";

// export const PocketBaseContext = createContext({});

// const pb = new Pocketbase("https://backend.jakobevangelista.com:443");

// export default function PocketBaseWrapper({ children }) {
//   const [currentUser, setCurrentUser] = useState(pb.authStore.model);
//   pb.authStore.onChange((auth) => {
//     console.log("authStore changed", auth);
//     setCurrentUser(pb.authStore.model);
//   });
//   return (
//     <PocketBaseContext.Provider value={{ currentUser }}>
//       {children}
//     </PocketBaseContext.Provider>
//   );
// }
