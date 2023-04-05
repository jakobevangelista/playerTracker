"use client";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { Badge } from "@chakra-ui/react";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

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
      <Button colorScheme="blue" onClick={logout}>
        Logout
      </Button>
      <Button colorScheme="blue" onClick={goHome}>
        Home
      </Button>
    </>
  );
}
