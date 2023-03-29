"use client";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const pb = new PocketBase("http://45.33.6.9:81");

async function getTables() {
  // const records = await pb.collection("table").getFullList({
  //   sort: "-created",
  // });
  const res = await fetch(
    "http://45.33.6.9:81/_/#/collections?collectionId=6hefqmhdmxwit5e&filter=&sort=-created"
  );
  data = await res.json();
  console.log(data);
  return data;
}

export default async function Home() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  // const [records, setRecords] = useState("");
  // const [userInput, setUserInput] = useState("");

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
  // const tables = await getTables();

  return (
    <>
      <h1>We back {username}</h1>
      <button onClick={logout}>Logout</button>
      {/* <div>
        {tables.map((table) => {
          return <Table key={table.id} />;
        })}
      </div> */}
    </>
  );
}

// function Table(table) {
//   const { id } = table;

//   return <div>{id}</div>;
// }
