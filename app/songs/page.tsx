'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SongsPage() {
  const router = useRouter()

  useEffect(() => {
    const keys = Object.keys(localStorage)
    const hasSongs = keys.some((k) => k.startsWith('song-'))

    if (!hasSongs) {
      router.replace('/') // ✅ redirect ไปหน้าแรก
    }
  }, [])

  return (
    <main className="p-10 text-gray-700 dark:text-gray-200">
      <h1 className="text-xl font-bold mb-4">รายการเพลงทั้งหมด</h1>
      {/* ...ในกรณีมีเพลงค่อยแสดง */}
      <p>กำลังโหลดเพลง...</p>
    </main>
  )
}
