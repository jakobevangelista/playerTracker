import twilio from "twilio";
import { NextResponse } from "next/server";

export async function POST(request) {
  const body = await request.json();
  const accountSid = "AC5c5808701376cbf4b4b5d794da15de91";
  const authToken = "ed95fe2ee3237e64b97e7030705cee71";
  const client = twilio(accountSid, authToken);
  client.messages
    .create({
      body: body.message,
      from: "+19798145647",
      to: "+12814912480",
    })
    .then((message) => {
      console.log(message.sid);
      return NextResponse.json({ response: "Hello, Next.js!" });
    });
}
