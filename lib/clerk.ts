// lib/clerk.ts
import { auth } from "@clerk/nextjs/server";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({ 
  secretKey: process.env.CLERK_SECRET_KEY!
});

export type Tier = "free" | "silver" | "gold" | "platinum";

export async function getUserTier(): Promise<Tier> {
  const session = await auth(); 
  const userId = session.userId;

  if (!userId) return "free";

  try {
    const user = await clerk.users.getUser(userId);
    const tier = user?.publicMetadata?.tier;
    if (tier === "free" || tier === "silver" || tier === "gold" || tier === "platinum") {
      return tier;
    }
    return "free";
  } catch (error) {
    console.error("Error fetching user:", error);
    return "free";
  }
}

export async function updateUserTier(tier: Tier): Promise<void> {
  const session = await auth();
  const userId = session.userId;

  if (!userId) throw new Error("Not signed in");

  try {
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: { tier }
    });
  } catch (error) {
    console.error("Error updating tier:", error);
    throw error;
  }
}
