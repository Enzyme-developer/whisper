import { db } from "@/app/lib/db";
import { auth, currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

const createPollSchema = z.object({
  question: z.string(),
  options: z.array(z.string()),
});

export async function POST(request: NextRequest) {
  const { question, options } = await createPollSchema.parse(request.json());
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json(
        {
          error: "User not found",
          user: null,
        },
        { status: 404 }
      );
    }

    const expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 24);

    const createdPoll = await db.poll.create({
      data: {
        question,
        username: user?.username as string,
        options,
        expirationDate,
      },
    });

    return Response.json({ error: null, createdPoll });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, createdPoll: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", createdMessage: null },
      { status: 500 }
    );
  }
}
