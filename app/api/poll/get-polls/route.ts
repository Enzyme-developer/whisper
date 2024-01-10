import { db } from "@/app/lib/db";
import { currentUser } from "@clerk/nextjs";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  try {
    const user = await currentUser();

    if (!user) {
      return Response.json(
        {
          error: "User not found",
          polls: null,
        },
        { status: 404 }
      );
    }

    const allPolls = await db.poll.findMany({
      where: { username: user?.username as string },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return Response.json({ error: null, polls: allPolls });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, polls: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", polls: null },
      { status: 500 }
    );
  }
}
