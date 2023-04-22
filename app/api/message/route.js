import twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  await client.messages
    .create({
      body: body.message,
      from: "+19798145647",
      to: "+12814912480",
    })
    .then((message) => {
      console.log(message.sid);
      return NextResponse.json({ response: "Hello, Next.js!" });
    })
    .catch((err) => console.error(err));
}
