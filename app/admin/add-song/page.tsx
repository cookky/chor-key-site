'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import AlignedLyrics from '@/components/AlignedLyrics'

type Artist = {
  id: string
  name: string
}

export default function AddSongPage() {
  const router = useRouter()

  const [form, setForm] = useState({
    title: '',
    slug: '',
    artist: '',
    artist_id: '',
    key: '',
    chords: '',
    lyrics: '',
    tags: '',
    imageFile: null as File | null,
  })

  const [artists, setArtists] = useState<Artist[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch all artists
  useEffect(() => {
    const fetchArtists = async () => {
      const { data, error } = await supabase
        .from('artists')
        .select('id, name')
        .order('name')

      if (!error && data) {
        setArtists(data)
      }
    }

    fetchArtists()
  }, [])

  const filteredArtists = searchTerm
    ? artists.filter((a) =>
        a.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setForm({ ...form, imageFile: e.target.files[0] })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    let image_url = ''
    if (form.imageFile) {
      const fileExt = form.imageFile.name.split('.').pop()
      const fileName = `${uuidv4()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('songs')
        .upload(fileName, form.imageFile)

      if (uploadError) {
        setError('Upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: publicUrl } = supabase.storage
        .from('songs')
        .getPublicUrl(fileName)
      image_url = publicUrl?.publicUrl || ''
    }

    const { error: insertError } = await supabase.from('songs').insert([
      {
        title: form.title,
        slug: form.slug,
        artist: form.artist,
        artist_id: form.artist_id,
        key: form.key,
        chords: form.chords.split(',').map((s) => s.trim()),
        lyrics: form.lyrics,
        tags: form.tags.split(',').map((s) => s.trim()),
        image_url,
      },
    ])

    if (insertError) {
      setError(insertError.message)
    } else {
      router.push(`/songs/${form.slug}`)
    }

    setLoading(false)
  }

  return (
    <main className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-orange-600">เพิ่มเพลงใหม่</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Input label="ชื่อเพลง" name="title" value={form.title} onChange={handleChange} required />
          <Input label="Slug (URL)" name="slug" value={form.slug} onChange={handleChange} required />
          <Input label="คีย์" name="key" value={form.key} onChange={handleChange} />
          <Input label="คอร์ด (comma separated)" name="chords" value={form.chords} onChange={handleChange} />
          <Textarea label="Lyrics" name="lyrics" value={form.lyrics} onChange={handleChange} />
          <Input label="Tags (comma separated)" name="tags" value={form.tags} onChange={handleChange} />

          {/* 🔍 Autocomplete Search */}
          <div className="relative">
            <label className="block font-medium mb-1">ค้นหาศิลปิน</label>
            <input
              type="text"
              value={form.artist}
              name="artist"
              onChange={(e) => {
                const value = e.target.value
                setForm((prev) => ({ ...prev, artist: value }))
                setSearchTerm(value)
              }}
              placeholder="ค้นหาศิลปิน..."
              className="w-full border px-3 py-2 rounded"
            />
            {searchTerm && filteredArtists.length > 0 && (
              <ul className="absolute z-10 bg-white dark:bg-gray-800 border mt-1 w-full max-h-48 overflow-y-auto rounded shadow">
                {filteredArtists.map((artist) => (
                  <li
                    key={artist.id}
                    className="px-4 py-2 cursor-pointer hover:bg-orange-100 dark:hover:bg-orange-900"
                    onClick={() => {
                      setForm((prev) => ({
                        ...prev,
                        artist: artist.name,
                        artist_id: artist.id,
                      }))
                      setSearchTerm('')
                    }}
                  >
                    {artist.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* 📷 Image Upload */}
          <div>
            <label className="block font-medium mb-1">ภาพหน้าปก</label>
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700 disabled:opacity-50"
          >
            {loading ? 'กำลังบันทึก...' : 'เพิ่มเพลง'}
          </button>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-100 mb-2">🔍 Live Preview</h2>
          <div className="bg-white dark:bg-gray-900 border rounded-lg p-4 overflow-auto max-h-[80vh]">
            <AlignedLyrics
              lyrics={form.lyrics}
              currentKey={form.key || 'C'}
              originalKey={form.key || 'C'}
              useFlat={false}
            />
          </div>
        </div>
      </form>
    </main>
  )
}

// Input component
function Input({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <input {...props} className="w-full border px-3 py-2 rounded" />
    </div>
  )
}

// Textarea component
function Textarea({ label, ...props }: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <textarea {...props} rows={6} className="w-full border px-3 py-2 rounded font-mono" />
    </div>
  )
}
