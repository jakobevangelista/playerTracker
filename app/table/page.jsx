"use client";

import {
  Card,
  CardBody,
  Stack,
  Heading,
  Text,
  Divider,
  CardFooter,
} from "@chakra-ui/react";
import BottomButton from "./BottomButtons";
export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

export default function Table({
  tableId,
  tableUsers,
  numUsers,
  tableDescription,
  tableName,
}) {
  return (
    <>
      <Card maxW="sm" className="m-6">
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
