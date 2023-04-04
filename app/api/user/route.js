import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://45.33.6.9:81");

export async function POST(req) {
  const authData = await pb
    .collection("users")
    .authWithPassword(req.body.username, req.body.password);
  if (!authData) {
    return NextResponse.json({ response: "bad" });
  } else {
    return NextResponse.json({
      response: "good",
      headers: { "Set-Cookie": pb.authStore },
    });
  }
}
