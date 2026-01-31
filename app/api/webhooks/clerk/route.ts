import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import type { Prisma } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req, {
      signingSecret: process.env.CLERK_WEBHOOK_SIGNING_SECRET,
    });

    if (evt.type === "user.created") {
      const data = evt.data;
      const primaryEmailObj = data.primary_email_address_id
        ? data.email_addresses?.find((e) => e.id === data.primary_email_address_id)
        : data.email_addresses?.[0];
      const email = primaryEmailObj?.email_address ?? "";
      const emailLocal = email.split("@")[0]?.replace(/[^a-zA-Z0-9_.]/g, "_").slice(0, 30) ?? "";
      const username =
        (data.username && data.username.trim()) ||
        emailLocal ||
        `user_${data.id.replace(/\W/g, "_").slice(-16)}`;
      const displayName =
        [data.first_name, data.last_name].filter(Boolean).join(" ") || data.username || emailLocal || username;

      try {
        await prisma.user.create({
          data: {
            clerkUserId: data.id,
            username: username.toLowerCase(),
            email: email || `${data.id}@clerk.placeholder`,
            passwordHash: null,
            displayName: displayName || null,
            avatarUrl: data.image_url || null,
          } as unknown as Prisma.UserUncheckedCreateInput,
        });
      } catch (dbError: unknown) {
        const err = dbError as { code?: string };
        if (err.code === "P2002") {
          const existing = await prisma.user.findUnique({
            where: { clerkUserId: data.id } as unknown as Prisma.UserWhereUniqueInput,
          });
          if (existing) return new Response("OK", { status: 200 });
        }
        throw dbError;
      }
    }

    return new Response("OK", { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Clerk webhook error:", message, err);
    return new Response(`Webhook verification failed: ${message}`, { status: 400 });
  }
}
