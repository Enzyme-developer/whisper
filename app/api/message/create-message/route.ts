import { db } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";
var CryptoJS = require("crypto-js");
const PushNotifications = require("@pusher/push-notifications-server");

export async function POST(request: NextRequest) {
  const { content, recipient } = await request.json();

  const beamsClient = new PushNotifications({
    instanceId: "8f9a6e22-2483-49aa-8552-125f1a4c5781",
    secretKey: "C54D42FB7CD2D408DDB22D7A0166F1D",
  });

  const encJson = CryptoJS.AES.encrypt(
    JSON.stringify(content),
    process.env.ENCRYPTION_KEY
  ).toString();

  const encryptedContent = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );

  try {
    const user = await db.user.findUnique({
      where: {
        username: recipient,
      },
    });

    if (!user) {
      return Response.json(
        {
          error: "Recipient not found",
          message: null,
        },
        { status: 404 }
      );
    }

    const createdMessage = await db.message.create({
      data: {
        content: encryptedContent,
        recipient: user?.username,
      },
    });

    beamsClient
      .publishToUsers(["2", "3"], {
        apns: {
          aps: {
            alert: {
              title: "Hello",
              body: "Hello, world!",
            },
          },
        },
        fcm: {
          notification: {
            title: "Hello",
            body: "Hello, world!",
          },
        },
        web: {
          notification: {
            title: "Hello",
            body: "Hello, world!",
          },
        },
      })
      .then((publishResponse: { publishId: string }) => {
        console.log("Just published:", publishResponse.publishId);
        console.log(publishResponse)
      })
      .catch((error: any) => {
        console.error("Error:", error);
      });

    return Response.json({ error: null, createdMessage });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, createdMessage: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", createdMessage: null },
      { status: 500 }
    );
  }
}
