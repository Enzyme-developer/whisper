import { db } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const { answer, pollId } = await request.json();

  try {
    const poll = await db.poll.findUnique({
      where: { id: parseInt(pollId) },
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

    const updatedVotes = [...(poll?.votes as any)];

    const existingAnswerIndex = updatedVotes.findIndex(
      (v) => v.answer === answer
    );

    console.log(existingAnswerIndex);
    if (existingAnswerIndex !== -1) {
      updatedVotes[existingAnswerIndex].votes += 1;
    } else {
      updatedVotes.push({
        answer,
        votes: 1,
      });
    }

    const updatedPoll = await db.poll.update({
      where: { id: parseInt(pollId) },
      data: {
        votes: updatedVotes,
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
