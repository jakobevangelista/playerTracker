// "use client";
import Welcome from "./Welcome";
import Tables from "./tables/page";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://45.33.6.9:81");

// async function getData() {
//   const res = await fetch("http://localhost:3000/api/hello", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   return res.json();
// }

export default async function Home() {
  return (
    <>
      <div className="flex flex-row">
        <div className="flex flex-col bg-[#343541] w-1/5 h-screen text-white">
          <Welcome />
        </div>
        <div className="flex flex-row w-5/6 bg-[#202123] h-screen text-white">
          <Tables />
          {/* <div>{data.response}</div> */}
        </div>
      </div>
    </>
  );
}
