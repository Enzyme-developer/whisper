import { db } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

const voteSchema = z.object({
  pollId: z.number(),
  optionIndex: z.number(),
});

export async function POST(request: NextRequest) {
  const { optionIndex, pollId } = await voteSchema.parse(request.json());
  try {
    const poll = await db.poll.findUnique({
      where: { id: pollId },
    });

    if (!poll || new Date() > new Date(poll.expirationDate)) {
      return Response.json(
        {
          error: "Poll not found or expired",
          poll: null,
        },
        { status: 404 }
      );
    }

    const updatedPoll = await db.poll.update({
      where: { id: pollId },
      data: {
        votes: {
          increment: { [optionIndex]: 1 },
        } as number[] | any,
      },
    });

    return Response.json({ error: null, updatedPoll });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, updatedMessage: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", updatedMessage: null },
      { status: 500 }
    );
  }
}
