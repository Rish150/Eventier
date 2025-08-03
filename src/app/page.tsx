'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import EventCard from '@/components/EventCard'
import TierSelector from '@/components/TierSelector'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

type Event = {
  id: string
  title: string
  description: string
  date: string
  image: string
  tier: string
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from('events').select('*')
      if (error) {
        console.error('Error fetching events:', error)
      } else if (data) {
        setEvents(data as Event[])
      }
      setLoading(false)
    }

    fetchEvents()
  }, [])

  if (loading) return <p className="p-4">Loading events...</p>

  return (
    <div className="max-w-4xl mx-auto p-4">
      <TierSelector />
      <h1 className="text-2xl font-bold mb-4">Available Events</h1>
      <div className="grid grid-cols-1 gap-4">
        {events.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
