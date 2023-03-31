"use client";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pb = new PocketBase("http://45.33.6.9:81");

export default function Welcome() {
  const router = useRouter();
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!pb.authStore.token || !pb.authStore.isValid) {
      redirect("/login");
    } else {
      setUsername(pb.authStore.model.username);
    }
  });

  function logout() {
    pb.authStore.clear();
    router.push("/login");
  }
  return (
    <>
      <div className="text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer">
        Welcome {username}
      </div>
      <button
        class="button is-danger is-medium mx-8 mt-6 py-4 rounded-md"
        onClick={logout}
      >
        Logout
      </button>
    </>
  );
}
