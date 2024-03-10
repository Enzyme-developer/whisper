import { NextRequest, NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs";

const PushNotifications = require("@pusher/push-notifications-server");

const beamsClient = new PushNotifications({
  instanceId: process.env.INSTANCE_ID,
  secretKey: process.env.SECRET_KEY,
});

export async function GET(request: NextRequest, response: NextResponse) {
  try {
    const user = await currentUser();
    const userId = auth();
    const userIDInQueryParam = userId;
    if (userId != userIDInQueryParam) {
      return Response.json(
        {
          error: "Inconsistent request",
          message: null,
        },
        { status: 401 }
      );
    } else {
      const beamsToken = beamsClient.generateToken(userId);
      Response.json({ error: null, token: JSON.stringify(beamsToken) });
    }
  } catch (error: any) {
    console.error(error);
    return Response.json(
      { error: "Internal Server Error", messages: null },
      { status: 500 }
    );
  }
}
