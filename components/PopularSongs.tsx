// components/PopularSongs.tsx
import { FaVolumeUp, FaMusic } from 'react-icons/fa'
import Link from 'next/link'

const songs = [
  {
    artist: 'XYZ',
    chords: 'G D Em C',
    href: '/songs/example-1',
  },
  {
    artist: 'XYZ',
    chords: 'C Am F G',
    href: '/songs/example-2',
  },
]

export default function PopularSongs() {
  return (
    <section className="bg-orange-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="flex items-center gap-2 text-orange-600 font-semibold mb-6">
          <FaVolumeUp /> ตัวอย่างเพลงยอดนิยม
        </h2>
        <ul className="space-y-3 text-sm text-gray-800">
          {songs.map((song, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaMusic className="text-purple-400" />
              <span>
                ศิลปิน: <strong>{song.artist}</strong> — คอร์ด:{' '}
                <strong>{song.chords}</strong>{' '}
                <Link href={song.href} className="text-orange-500 underline hover:text-orange-600">
                  ดูคอร์ดเพลงนี้
                </Link>
              </span>
            </li>
          ))}
          <li className="ml-7 text-sm text-gray-600 mt-2">
            ศิลปิน XYZ —{' '}
            <Link href="/songs" className="text-orange-500 underline hover:text-orange-600">
              ดูคอร์ดเพิ่มเติม..
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
