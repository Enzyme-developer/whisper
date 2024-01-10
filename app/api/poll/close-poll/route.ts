import { db } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { pollId } = await request.json();

  try {
    const poll = await db.poll.findUnique({
      where: { id: pollId },
    });

    if (!poll) {
      return Response.json(
        { error: "Poll not found", poll: null },
        { status: 404 }
      );
    }

    const closedPoll = await db.poll.update({
      where: { id: pollId },
      data: { expirationDate: new Date() },
    });

    return Response.json({ error: null, closedPoll });
  } catch (error) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, closedPoll: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal server error", closedPoll: null },
      { status: 500 }
    );
  }
}
