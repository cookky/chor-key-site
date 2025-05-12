'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import SongHeader from '@/components/SongHeader'
import TransposeControls from '@/components/TransposeControls'
import ChordTags from '@/components/ChordTags'
import AlignedLyrics from '@/components/AlignedLyrics'
import ChordDiagrams from '@/components/ChordDiagrams'
import {
  getStep,
  transposeChord,
  transposeLyricsText,
} from '@/utils/transpose'
import { Song } from '@/types/song'
import SongTags from '@/components/SongTags'

export default function Page() {
  const { slug } = useParams()
  const [song, setSong] = useState<Song | null>(null)
  const [loading, setLoading] = useState(true)
  const [currentKey, setCurrentKey] = useState<string | null>(null)
  const [useFlat, setUseFlat] = useState<boolean>(true)

  useEffect(() => {
    if (!slug) return

    const fetchSong = async () => {
      const { data } = await supabase
        .from('songs')
        .select('*')
        .eq('slug', String(slug))
        .maybeSingle()

      if (data) {
        setSong(data)
        setCurrentKey(data.key || data.chords?.[0] || 'C')
      }

      setLoading(false)
    }

    fetchSong()
  }, [slug])

  if (loading || !song || !currentKey) {
    return <div className="p-10 text-gray-400">กำลังโหลดเพลง...</div>
  }

  const originalKey = song.key || song.chords[0]
  const step = getStep(originalKey, currentKey)
  const transposedLyrics =
    step === 0 ? song.lyrics : transposeLyricsText(song.lyrics, step, useFlat)
  const transposedChords =
    step === 0 ? song.chords : song.chords.map((ch) => transposeChord(ch, step, useFlat))

  return (
    <main className="min-h-screen py-12 px-6 md:px-10 bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
      <div className="max-w-2xl mx-auto space-y-6 font-sans text-gray-800 dark:text-gray-100">
        <SongHeader title={song.title} artist={song.artist} className="text-3xl md:text-4xl font-bold"/>

        {/* TAGS */}
        <SongTags tags={song.tags} />

        {/* TRANSPOSE */}
        <TransposeControls
          currentKey={currentKey}
          setCurrentKey={setCurrentKey}
          originalKey={originalKey}
        />

        <h2 className="text-lg font-semibold mt-6 text-gray-700 dark:text-gray-200">คอร์ดที่ใช้:</h2>
        <ChordTags chords={transposedChords} />

        <AlignedLyrics lyrics={transposedLyrics} />
        <ChordDiagrams chords={transposedChords} />
      </div>
    </main>
  )
}
