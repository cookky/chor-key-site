'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'
import ArtistCardSkeleton from '@/components/ArtistCardSkeleton'

type Artist = {
  id: string
  name: string
  image_url: string
  genre: string[] | null
}

export default function ArtistsPage() {
  const [artists, setArtists] = useState<Artist[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('id, name, image_url, genre')
        .order('name')
        .range(0, 20)

      if (!error) {
        setArtists(data)
      }

      setLoading(false)
    }

    fetchArtists()
  }, [])

  return (
    <main className="min-h-screen py-12 px-6 md:px-10 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-orange-600 dark:text-orange-300">🎤 ศิลปินทั้งหมด</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ArtistCardSkeleton key={i} />)
            : artists?.map((artist) => (
                <Link
                  key={artist.id}
                  href={`/artists/${artist.id}`}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg transition group"
                >
                  <div className="aspect-square relative w-full mb-3 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={artist.image_url ?? '/placeholder-artist.png'}
                      alt={artist.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100">{artist.name}</h2>
                  {artist.genre && (
                    <div className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      {artist.genre.join(', ')}
                    </div>
                  )}
                </Link>
              ))}
        </div>
      </div>
    </main>
  )
}
