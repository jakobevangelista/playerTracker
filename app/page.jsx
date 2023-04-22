"use client";
import Welcome from "./Welcome";
import Tables from "./tables/page";
import PocketBase from "pocketbase";

import { Flex } from "@chakra-ui/react";

export const dynamic = "auto",
  dynamicParams = true,
  revalidate = 0,
  fetchCache = "auto",
  runtime = "nodejs",
  preferredRegion = "auto";

const pb = new PocketBase("https://backend.jakobevangelista.com:443");

// async function getData() {
//   const res = await fetch("http://localhost:3000/api/hello", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.json();
// }

export default function Home() {
  return (
    <>
      {/* <div>{data.response}</div> */}
      {/* <div className="flex flex-row">
        <div className="flex flex-col bg-[#343541] w-1/5 h-screen text-white overflow-hidden">
          <Welcome />
        </div>
        <div className="flex flex-row w-5/6 bg-[#202123] h-screen overflow-auto text-white">
          <Tables />
          
        </div>
      </div> */}
      <Flex>
        <Flex
          direction="column"
          bg="#343541"
          w="20%"
          h="100vw"
          overflow="hidden"
        >
          <Welcome />
        </Flex>
        <Flex direction="row" bg="#202123" w="80%" h="100vw">
          <Tables />
        </Flex>
      </Flex>
    </>
  );
}
