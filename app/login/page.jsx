"use client";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useState } from "react";
import React from "react";

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const pb = new PocketBase("http://45.33.6.9:81");

  async function login() {
    const authData = await pb
      .collection("users")
      .authWithPassword(userName, password);
    if (authData) {
      router.push("/");
    }
  }

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          placeholder="username"
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <input
          placeholder="password"
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={login}>Submit</button>
        {/* <button onClick={googleSignIn}>Log in with Google</button> */}
      </form>
    </>
  );
}
