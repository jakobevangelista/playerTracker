"use client";
import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
  Button,
} from "@chakra-ui/react";
import BottomButton from "./BottomButtons";
import PocketBase from "pocketbase";
import { redirect, useRouter } from "next/navigation";
import { usePocket } from "../PocketBaseWrapper";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

export default function Table({
  tableId,
  tableUsers,
  numUsers,
  tableDescription,
  tableName,
}) {
  const router = useRouter();
  const user = usePocket();
  if (!user) {
    redirect("login");
  }

  async function deleteUser(userId) {
    const targetIndex = tableUsers.indexOf(userId);
    tableUsers.splice(targetIndex, 1);
    const data = {
      users: tableUsers,
    };
    console.log(data);

    const record = await pb.collection("tables").update(tableId, data);

    router.refresh();
  }
  if (pb.authStore.model?.email === "shadowjakey27@gmail.com") {
    return (
      <>
        <Card maxW="sm" margin="6">
          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">{tableName}</Heading>
              <Text>{tableDescription}</Text>
              <Text color="blue.600" fontSize="2xl">
                Players: {numUsers}
              </Text>
              <Text color="blue.600" fontSize="2xl">
                {tableUsers?.map((user) => (
                  <Text key={user} color="blue.600" fontSize="2xl">
                    {user}
                    <Button
                      key={user}
                      colorScheme="red"
                      ml="2"
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteUser(user);
                      }}
                    >
                      Delete User
                    </Button>
                  </Text>
                ))}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <BottomButton tId={tableId} tUsers={tableUsers} />
          </CardFooter>
        </Card>
      </>
    );
  } else {
    return (
      <>
        <Card w="md" maxW="md" margin="6">
          <CardBody>
            <Stack mt="6" spacing="3">
              <Heading size="md">{tableName}</Heading>
              <Text>{tableDescription}</Text>
              <Text color="blue.600" fontSize="2xl">
                Players: {numUsers}
              </Text>
              <Text color="blue.600" fontSize="2xl">
                {tableUsers?.map((user) => (
                  <Text key={user} color="blue.600" fontSize="2xl">
                    {user}
                    {user === pb.authStore.model.id ? <Text>^[you]</Text> : ""}
                  </Text>
                ))}
              </Text>
            </Stack>
          </CardBody>
          <Divider />
          <CardFooter>
            <BottomButton tId={tableId} tUsers={tableUsers} />
          </CardFooter>
        </Card>
      </>
    );
  }
}
