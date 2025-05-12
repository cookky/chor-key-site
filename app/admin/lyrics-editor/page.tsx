'use client'

import { useState } from 'react'

export default function LyricsEditor() {
  const [lyrics, setLyrics] = useState<string>(`[C]จบแค่เพียง [G]ม.3 เพราะความลำเค็ญ`)

  const handleCopy = () => {
    navigator.clipboard.writeText(lyrics)
    alert('คัดลอกเรียบร้อยแล้ว ✅')
  }

  const handleDownload = () => {
    const blob = new Blob([lyrics], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'lyrics.txt'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Lyrics Editor */}
      <div>
        <h2 className="text-xl font-bold mb-2">🎼 แก้ไข Lyrics</h2>
        <textarea
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          className="w-full h-96 p-4 rounded-md border border-gray-300 dark:bg-gray-800 dark:text-white font-mono"
        />
        <div className="mt-4 flex gap-4">
          <button
            onClick={handleCopy}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            ✅ คัดลอก
          </button>
          <button
            onClick={handleDownload}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            📁 ดาวน์โหลด
          </button>
        </div>
      </div>

      {/* Live Preview */}
      <div>
        <h2 className="text-xl font-bold mb-2">🔍 Live Preview</h2>
        <pre className="w-full h-96 p-4 rounded-md bg-gray-100 dark:bg-gray-900 dark:text-white overflow-auto font-mono whitespace-pre-wrap">
{lyrics}
        </pre>
      </div>
    </div>
  )
}
