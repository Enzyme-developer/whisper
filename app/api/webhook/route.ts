import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/app/lib/db";
import { JsonObject } from "@prisma/client/runtime/library";

export async function POST(req: Request) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt: WebhookEvent;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType == "email.created" || "user.created") {
    const { id, ...attributes } = evt.data;
    console.log(`Webhook with and ID of ${id}`);

    await db.user.upsert({
      where: { externalId: id },
      create: {
        externalId: id as string,
        attributes: attributes as JsonObject,
      },
      update: { attributes: attributes as JsonObject },
    });
  }

  console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
  return new Response("", { status: 200 });
}