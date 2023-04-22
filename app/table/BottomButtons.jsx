"use client";
import { ButtonGroup, Button } from "@chakra-ui/react";
import PocketBase from "pocketbase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

export default function BottomButton({ tId, tUsers }) {
  const [onList, setOnList] = useState();

  const router = useRouter();
  //   console.log(typeof tableUsers);

  useEffect(() => {
    if (tUsers.indexOf(pb.authStore.model.id) > -1) {
      setOnList(true);
    } else {
      setOnList(false);
    }
  });
  async function joinList() {
    tUsers.push(pb.authStore.model.id);
    const data = {
      users: tUsers,
    };
    // console.log(tUsers);
    const record = await pb.collection("tables").update(tId, data);
    setOnList(true);
    router.refresh();
  }
  async function leaveList() {
    const targetIndex = tUsers.indexOf(pb.authStore.model.id);
    tUsers.splice(targetIndex, 1);
    const data = {
      users: tUsers,
    };
    console.log(data);

    const record = await pb.collection("tables").update(tId, data);
    setOnList(false);
    router.refresh();
  }
  async function deleteTable() {
    await pb.collection("tables").delete(tId);
    router.refresh();
  }

  if (pb.authStore.model?.email === "shadowjakey27@gmail.com") {
    return (
      <>
        <Button variant="solid" colorScheme="red" onClick={deleteTable}>
          Delete Table
        </Button>
      </>
    );
  } else if (onList) {
    return (
      <>
        <Button variant="solid" colorScheme="blue" onClick={leaveList}>
          Leave List
        </Button>
      </>
    );
  } else {
    return (
      <>
        <Button variant="solid" colorScheme="blue" onClick={joinList}>
          Join List
        </Button>
      </>
    );
  }
}
