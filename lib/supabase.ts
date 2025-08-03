import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const tierPriority: Record<'free' | 'silver' | 'gold' | 'platinum', number> = {
  free: 1,
  silver: 2,
  gold: 3,
  platinum: 4,
};

type Tier = keyof typeof tierPriority | null;

export async function fetchEventsByTier(userTier: Tier) {
  if (!userTier || !(userTier in tierPriority)) {
    return []; // Return no events if tier is missing or invalid
  }

  const allowedTiers = Object.entries(tierPriority)
    .filter(([_, priority]) => priority <= tierPriority[userTier])
    .map(([tier]) => tier);

  const { data, error } = await supabase
    .from('events')
    .select('*')
    .in('tier', allowedTiers);

  if (error) throw new Error(`Failed to fetch events: ${error.message}`);

  return data;
}
