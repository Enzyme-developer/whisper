import { db } from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const pollId = await request.nextUrl.searchParams.get("pollId");

    if (!pollId) {
      return Response.json(
        {
          error: "Poll not found",
          poll: null,
        },
        { status: 404 }
      );
    }

    const poll = await db.poll.findUnique({
      where: { id: parseInt(pollId) },
    });

    return Response.json({ error: null, poll });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, poll: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", messages: null },
      { status: 500 }
    );
  }
}
