import { NextResponse } from "next/server";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://45.33.6.9:81");

export async function POST(request) {
  if (!pb.authStore.token || !pb.authStore.isValid) {
    return NextResponse.json({ response: "Not logged in" });
  } else {
    return NextResponse.json({ response: "Logged In!" });
  }
}
