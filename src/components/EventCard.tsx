'use client'

import React from 'react'

interface Event {
  id: string
  title: string
  description: string
  date: string
  tier: string
  imageUrl?: string // Optional image URL
}

export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="border rounded-lg shadow-sm p-4 flex flex-col bg-white">
      {/* Image at top */}
      {event.imageUrl ? (
        <img
          src={event.imageUrl}
          alt={event.title || 'Event image'}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-md mb-4 text-gray-500 text-sm">
          Image not available
        </div>
      )}

      {/* Event Info */}
      <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
      <p className="text-gray-700 text-sm mb-2">{event.description}</p>
      <p className="text-sm text-gray-500">Date: {event.date}</p>
      <span className="inline-block mt-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
        Tier: {event.tier}
      </span>
    </div>
  )
}
