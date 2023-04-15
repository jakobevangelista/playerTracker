"use client";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
// import twilio from "twilio";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useState } from "react";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

export default function Welcome() {
  const router = useRouter();
  const [tableName, setTableName] = useState("");
  const [tableDescription, setTableDescription] = useState("");
  const [textMessage, setTextMessage] = useState("");
  // const userEmail = pb.authStore.model?.email || {};
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

  async function handleAddTable() {
    const data = {
      description: tableDescription,
      tablename: tableName,
    };
    const record = await pb.collection("tables").create(data);
    router.refresh();
  }

  async function handleSendText() {
    const res = await fetch(`${process.env.APIURL}/api/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: textMessage }),
    });
  }

  if (pb.authStore.model?.email === "shadowjakey27@gmail.com") {
    return (
      <>
        <div
          onClick={goHome}
          className='text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer'
        >
          Welcome {pb.authStore.model.email}
        </div>
        <Button colorScheme='blue' onClick={logout}>
          Logout {pb.authStore.model.email}
        </Button>
        <div>Admin signed in</div>
        <Box maxW='md' mx='auto' mt={8}>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl id='tableName' mb={4}>
              <FormLabel>Table Name</FormLabel>
              <Input
                type='text'
                onChange={(e) => setTableName(e.target.value)}
              />
            </FormControl>
            <FormControl id='description' mb={4}>
              <FormLabel>Description</FormLabel>
              <Textarea onChange={(e) => setTableDescription(e.target.value)} />
            </FormControl>
            <Button colorScheme='blue' type='submit' onClick={handleAddTable}>
              Add Table
            </Button>
          </form>
          <form onSubmit={(e) => e.preventDefault()}>
            <FormControl id='textMessage' mb={4}>
              <FormLabel>Text Message</FormLabel>
              <Textarea onChange={(e) => setTextMessage(e.target.value)} />
            </FormControl>
            <Button colorScheme='blue' type='submit' onClick={handleSendText}>
              Send Text
            </Button>
          </form>
        </Box>
      </>
    );
  }
  return (
    <>
      <div
        onClick={goHome}
        className='text-center py-3 px-3 rounded-md hover:underline text-white cursor-pointer'
      >
        Welcome {pb.authStore.model.username}
      </div>
      <Button colorScheme='blue' onClick={logout}>
        Logout {pb.authStore.model.email}
      </Button>
      {/* <Button colorScheme="blue" onClick={goHome}>
        Home
      </Button> */}
    </>
  );
}
