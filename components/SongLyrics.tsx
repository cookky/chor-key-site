'use client';

interface SongLyricsProps {
  chords: string[][];
  lyrics: string[];
}

export default function SongLyrics({ chords, lyrics }: SongLyricsProps) {
  return (
    <div className="basis-2/3 space-y-4">
      {chords.map((line, idx) => (
        <div key={idx}>
          <div className="font-mono text-sm text-gray-800 whitespace-pre">
            {line.map(c => c.padEnd(6)).join('')}
          </div>
          <div className="text-sm text-gray-900">{lyrics[idx]}</div>
        </div>
      ))}
    </div>
  );
}
