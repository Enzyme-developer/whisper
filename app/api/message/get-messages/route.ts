import { db } from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";
var CryptoJS = require("crypto-js");

export async function GET(request: NextRequest) {
  try {
    const userId = auth();
    const user = await currentUser();

    if (!userId) {
      return Response.json(
        {
          error: "User not found",
          message: null,
        },
        { status: 404 }
      );
    }

    const allMessages = await db.message.findMany({
      where: { recipient: user?.username as string },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    allMessages.forEach((message) => {
      const decData = CryptoJS.enc.Base64.parse(message.content).toString(
        CryptoJS.enc.Utf8
      );
      const bytes = CryptoJS.AES.decrypt(
        decData,
        process.env.ENCRYPTION_KEY
      ).toString(CryptoJS.enc.Utf8);

      message.content = JSON.parse(bytes);
    });

    return Response.json({ error: null, messages: allMessages });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, messages: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", messages: null },
      { status: 500 }
    );
  }
}
