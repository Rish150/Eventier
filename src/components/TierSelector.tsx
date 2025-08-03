'use client'

import { useUser } from '@clerk/nextjs'
import { useEffect, useState } from 'react'

const tiers = ['free', 'silver', 'gold', 'platinum'] as const
type Tier = typeof tiers[number]

export default function TierSelector() {
  const { user, isLoaded } = useUser()
  const [currentTier, setCurrentTier] = useState<Tier>('free')

  useEffect(() => {
    if (isLoaded && user) {
      const tier = user.publicMetadata?.tier as string | undefined
      if (tier && (tiers as readonly string[]).includes(tier)) {
        setCurrentTier(tier as Tier)
      }
    }
  }, [isLoaded, user])

  const simulateTierUpgrade = (newTier: Tier) => {
    setCurrentTier(newTier)
    alert(`Tier temporarily upgraded to ${newTier.toUpperCase()}`)
  }

  return (
    <div className="p-4 border rounded-md mb-6">
      <h2 className="text-lg font-semibold mb-2">
        Your Tier: <span className="text-blue-600">{currentTier.toUpperCase()}</span>
      </h2>
      <div className="flex gap-2 flex-wrap">
        {tiers.map((tier) => (
          <button
            key={tier}
            onClick={() => simulateTierUpgrade(tier)}
            disabled={currentTier === tier}
            className={`px-4 py-2 border rounded ${
              currentTier === tier
                ? 'bg-green-500 text-white cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
          >
            {tier.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
