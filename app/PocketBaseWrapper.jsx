"use client";

import { createContext, useState } from "react";
import Pocketbase from "pocketbase";

export const PocketBaseContext = createContext({});

const pb = new Pocketbase("https://backend.jakobevangelista.com:443");

export default function PocketBaseWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);
  pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    setCurrentUser(pb.authStore.model);
  });
  return (
    <PocketBaseContext.Provider value={{ currentUser }}>
      {children}
    </PocketBaseContext.Provider>
  );
}
