import { db } from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { content, recipient } = await request.json();
  try {
    // if (!userId) {
    //   return Response.json(
    //     {
    //       error: "Recipient not found",
    //       message: null,
    //     },
    //     { status: 404 }
    //   );
    // }

    const createdMessage = await db.message.create({
      data: {
        content,
        recipient,
      },
    });

    console.log(createdMessage);
    return Response.json({ error: null, createdMessage });
  } catch (error: any) {
    console.log(error);
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