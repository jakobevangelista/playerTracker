"use client";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pb = new PocketBase("http://45.33.6.9:81");

export default function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  // const [userInput, setUserInput] = useState("");

  useEffect(() => {
    if (!pb.authStore.token || !pb.authStore.isValid) {
      redirect("/login");
    } else {
      setUsername(pb.authStore.model.username);
    }

    // you can also fetch all records at once via getFullList
    const records = pb.collection("table").getFullList({
      sort: "-created",
    });
  });

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }

  return (
    <>
      <h1>We're back {username}</h1>
      <button onClick={logout}>Logout</button>
    </>
  );
}
