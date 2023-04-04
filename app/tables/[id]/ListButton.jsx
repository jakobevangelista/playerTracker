"use client";
import { useEffect, useState, useContext } from "react";
import PocketBase from "pocketbase";
import { PocketBaseContext } from "../../PocketBaseWrapper";
import { useRouter } from "next/navigation";

const pb = new PocketBase("http://45.33.6.9:81");
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

export default function ListButton({ tableId, tableUsers }) {
  const [onList, setOnList] = useState();
  let { currentUser } = useContext(PocketBaseContext);
  const router = useRouter();

  useEffect(() => {
    if (tableUsers.indexOf(currentUser.id) > -1) {
      setOnList(true);
    } else {
      setOnList(false);
    }
  });

  async function joinList() {
    tableUsers.push(currentUser.id);
    const data = {
      users: tableUsers,
    };
    const record = await pb.collection("tables").update(tableId, data);
    setOnList(true);
    router.refresh();
  }
  async function leaveList() {
    const targetIndex = tableUsers.indexOf(currentUser.id);
    tableUsers.splice(targetIndex, 1);
    const data = {
      users: tableUsers,
    };
    const record = await pb.collection("tables").update(tableId, data);
    setOnList(false);
    router.refresh();
  }
  if (onList) {
    return (
      <>
        <button class="card-footer-item" onClick={leaveList}>
          Leave List {currentUser.id}
        </button>
      </>
    );
  } else {
    return (
      <>
        <button class="button card-footer-item" onClick={joinList}>
          Join List {currentUser.id}
        </button>
      </>
    );
  }
}
