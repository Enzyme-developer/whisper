import { db } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { content, recipient } = await request.json();
  try {
    const user = await db.user.findUnique({
      where: {
        username: recipient
      },
    });

    console.log(user)
    
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
        content,
        recipient: user?.username,
      },
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
