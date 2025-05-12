'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function AddSongPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [chords, setChords] = useState('')
  const [lyrics, setLyrics] = useState('')

  function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD") // แยกสระออก
    .replace(/[\u0300-\u036f]/g, '') // ลบวรรณยุกต์
    .replace(/[^a-z0-9]+/g, '-') // แทนช่องว่างหรืออักขระพิเศษ
    .replace(/(^-|-$)/g, '') // ลบขอบข้าง
}

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const slug = slugify(title)

    const newSong = {
      title,
      artist,
      chords: chords.split(',').map((c) => c.trim()),
      lyrics,
    }

    localStorage.setItem(`song-${slug}`, JSON.stringify(newSong))
    router.push(`/songs/${slug}`)
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12 font-sans text-gray-800 dark:text-gray-100">
      <h1 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-300">
        เพิ่มเพลงใหม่ <span className="text-sm font-normal text-gray-500">(Admin)</span>
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-medium mb-1">ชื่อเพลง</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="เช่น โลกอีกใบ"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">ศิลปิน</label>
          <input
            type="text"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
            required
            placeholder="เช่น ป๊อบ ปองกูล"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">คอร์ดที่ใช้ (คั่นด้วย ,)</label>
          <input
            type="text"
            value={chords}
            onChange={(e) => setChords(e.target.value)}
            required
            placeholder="C, G, Am7, F"
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">เนื้อเพลง (ใช้ [C] ในบรรทัด)</label>
          <textarea
            value={lyrics}
            onChange={(e) => setLyrics(e.target.value)}
            required
            rows={6}
            placeholder={`[C]ตัวอย่างเนื้อเพลงแสดงคอร์ดบนคำ\n[G]บรรทัดต่อมา`}
            className="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white placeholder:text-gray-400"
          />
        </div>

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2 rounded-md transition"
        >
          บันทึกเพลง
        </button>
      </form>
    </main>
  )
}
