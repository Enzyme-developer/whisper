import { db } from "@/app/lib/db";
import { NextRequest } from "next/server";
import { z } from "zod";

export async function POST(req: NextRequest) {
  const { grant, wishlistId } = await req.json();

  try {
    const wishlist = await db.wishlist.findUnique({
      where: { id: wishlistId },
    });

    if (!wishlist) {
      return Response.json(
        {
          error: "Wishlist not found or expired",
          wishlist: null,
        },
        { status: 404 }
      );
    }

    const updatedGrants = [...(wishlist?.grants as any)];

    const existingGrantIndex = updatedGrants.findIndex(
      (g) => g.grant === grant
    );

    if (existingGrantIndex !== -1) {
      return Response.json(
        {
          error: "Wish already granted",
          wishlist: null,
        },
        { status: 400 }
      );
    } else {
      updatedGrants.push({
        grant,
        promise: 1,
      });
    }

    const updatedWishlist = await db.wishlist.update({
      where: { id: wishlistId },
      data: {
        grants: updatedGrants,
      },
    });

    return Response.json({ error: null, updatedWishlist });
  } catch (error: any) {
    console.error(error);
    if (error instanceof z.ZodError) {
      return Response.json(
        { error: error.issues, updatedWishlist: null },
        { status: 400 }
      );
    }

    return Response.json(
      { error: "Internal Server Error", updatedWishlist: null },
      { status: 500 }
    );
  }
}
