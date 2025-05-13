'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (!query.trim()) {
        setResults([])
        setShowDropdown(false)
        return
      }

      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then((res) => res.json())
        .then((data) => {
          setResults(data.results ?? [])
          setShowDropdown(true)
        })
    }, 300)

    return () => clearTimeout(delayDebounce)
  }, [query])

  const handleSelect = (slug: string) => {
    setQuery('')
    setShowDropdown(false)
    router.push(`/songs/${slug}`)
  }

  return (
    <div className="relative bg-white px-4 py-3 shadow-md z-50">
      <div className="max-w-2xl mx-auto">
        <input
          type="text"
          placeholder="ค้นหาเพลง..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {showDropdown && results.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-200 rounded-md mt-1 max-w-2xl mx-auto shadow-lg z-50">
            {results.map((song) => (
              <li 
                key={song.id}
                onClick={() => handleSelect(song.slug)}
                className="px-4 py-2 hover:bg-orange-100 cursor-pointer"
              >
                <span className="font-semibold text-orange-600">{song.title}</span>{' '}
                <span className="text-sm text-gray-500">– {song.artist}</span>
              </li>
            ))}
          </ul>
        )}

        {showDropdown && results.length === 0 && (
          <div className="absolute bg-white border border-gray-200 rounded-md mt-1 px-4 py-2 text-sm text-gray-500 shadow max-w-2xl mx-auto">
            ไม่พบเพลงที่ตรงกับคำค้น
          </div>
        )}
      </div>
    </div>
  )
}
