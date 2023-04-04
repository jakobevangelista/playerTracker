"use client";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useContext } from "react";
import { PocketBaseContext } from "./PocketBaseWrapper";

const pb = new PocketBase("https://backend.jakobevangelista.com");

export default function Welcome() {
  const router = useRouter();
  // let { currentUser } = useContext(PocketBaseContext);

  // if (!currentUser) {
  //   redirect("/login");
  // }
  if (!pb.authStore.model) {
    redirect("/login");
  }

  function logout() {
    router.push("/login");
    pb.authStore.clear();
  }
  function goHome() {
    router.push("/");
  }
  return (
    <>
      <div
        onClick={goHome}
        className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer"
      >
        Welcome {pb.authStore.model.username}
      </div>
      <button
        className="button is-danger is-medium mx-8 mt-6 py-4 rounded-md"
        onClick={logout}
      >
        Logout
      </button>
      <button
        className="button is-danger is-medium mx-8 mt-6 py-4 rounded-md"
        onClick={goHome}
      >
        Home
      </button>
    </>
  );
}
