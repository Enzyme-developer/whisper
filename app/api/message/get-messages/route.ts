import { db } from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

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
