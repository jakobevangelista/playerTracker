"use client";
import { useRouter } from "next/navigation";
import PocketBase from "pocketbase";
import { useState, useContext } from "react";
import React from "react";
import { PocketBaseContext } from "../PocketBaseWrapper";

const pb = new PocketBase("https://backend.jakobevangelista.com");

export default function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // let { currentUser } = useContext(PocketBaseContext);

  async function login() {
    // await pb.collection("users").authWithPassword(userName, password);
    // setCurrentUser(
    //   await pb.collection("users").authWithPassword(userName, password)
    // );
    // if (currentUser) {
    //   router.push("/");
    // }
    const authData = await pb
      .collection("users")
      .authWithPassword(userName, password);
    if (pb.authStore.model) {
      router.push("/");
    }
  }

  return (
    <>
      <div class="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 class="text-center text-3xl font-extrabold text-gray-900">
            Login
          </h1>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => e.preventDefault()}>
              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div class="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    autoComplete="username"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    class="appearance-none block w-full px-3 py-2 border border-gray-300
                              rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                              focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></input>
                </div>
              </div>

              <div class="mt-6">
                <label
                  for="password"
                  class="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div class="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    class="appearance-none block w-full px-3 py-2 border border-gray-300
                              rounded-md shadow-sm placeholder-gray-400 focus:outline-none 
                              focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  ></input>
                </div>
              </div>

              <div class="mt-6">
                <button
                  type="submit"
                  onClick={login}
                  class="w-full flex justify-center py-2 px-4 
                     border border-transparent rounded-md shadow-sm text-sm font-medium 
                     text-white bg-blue-600 hover:bg-blue-700 focus:outline-none 
                     focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
