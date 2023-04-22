import twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const client = twilio(accountSid, authToken);
  return client.messages
    .create({
      body: body.message,
      from: "+19798145647",
      to: "+12814912480",
    })
    .then((message) => {
      console.log(message.sid);
      return NextResponse.json({ success: true });
    })
    .catch((err) => {
      console.error(err);
      return NextResponse.json({ success: false });
    });
}
