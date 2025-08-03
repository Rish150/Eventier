// app/settings/page.tsx
"use client"

import { useUser } from "@clerk/nextjs"
import { useState } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

const tiers = ["free", "silver", "gold", "platinum"]

export default function SettingsPage() {
  const { user } = useUser()
  const [selectedTier, setSelectedTier] = useState(user?.publicMetadata?.tier || "free")

  const handleTierChange = async (tier: string) => {
    setSelectedTier(tier)

    await fetch("/api/update-tier", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier }),
    })

    window.location.reload()
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">Select Your Tier</h2>
      <div className="flex gap-4 flex-wrap">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => handleTierChange(tier)}
            className={`border px-4 py-2 rounded ${
              selectedTier === tier ? "bg-purple-600 text-white" : "bg-white text-black"
            } hover:bg-purple-700 hover:text-white transition`}
          >
            {tier}
          </button>
        ))}
      </div>
    </div>
  )
}
