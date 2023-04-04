"use client";

import { createContext, useState } from "react";
import Pocketbase from "pocketbase";

export const PocketBaseContext = createContext({});

const pb = new Pocketbase("http://45.33.6.9:81");

export default function PocketBaseWrapper({ children }) {
  const [currentUser, setCurrentUser] = useState(pb.authStore.model);
  pb.authStore.onChange((auth) => {
    console.log("authStore changed", auth);
    setCurrentUser(pb.authStore.model);
  });
  return (
    <PocketBaseContext.Provider value={{ currentUser, pb }}>
      {children}
    </PocketBaseContext.Provider>
  );
}
