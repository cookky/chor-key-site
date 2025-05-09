'use client';

import { useState } from 'react';
import Header from '../components/Header';
import ChordDiagram from '../components/ChordDiagram';
import TagButtons from '../components/TagButtons';
import MarkdownLyrics from '@/components/MarkdownLyrics';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

const initialChords = [
  ['G', 'D', 'Dm', 'C'],
  ['G', 'C', 'D', 'C'],
];

const rawChordText = `
[G]เนื้อ[Gm]เพลง[C]เพราะ[G]มาก
[Em]อยาก[D]ร้อง[Bm]ให้เธอ[F]ฟัง
`;

const tags = ['แนะนำ', 'มาใหม่', 'ยอดนิยม', 'ฮิต', 'เพลงสดริง', 'เพลงเพื่อชีวิต', 'ลูกทุ่ง'];

function transposeChord(chord: string, steps: number): string {
  const base = chord.replace(/m|7|sus|dim|\d+/gi, '');
  const index = NOTES.indexOf(base);
  if (index === -1) return chord;
  const newIndex = (index + steps + NOTES.length) % NOTES.length;
  return chord.replace(base, NOTES[newIndex]);
}

export default function HomePage() {
  const [transposeStep, setTransposeStep] = useState(0);

  const transposedChords = initialChords.map(line =>
    line.map(chord => transposeChord(chord, transposeStep))
  );

  const uniqueChords = Array.from(new Set(transposedChords.flat()));

  return (
    <main className="min-h-screen bg-[#f5f5f5] py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">

        {/* Header */}
        <Header />

        {/* Title + Key Controls */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">ตัวอย่างเพลง</h2>
            <p className="text-sm text-gray-600">ศิลปิน</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-700">key:</span>
            <select
              value={transposeChord('G', transposeStep)}
              className="border rounded px-2 py-1"
              disabled
            >
              <option>{transposeChord('G', transposeStep)}</option>
            </select>
            <button onClick={() => setTransposeStep(s => s - 1)} className="bg-white border px-2 rounded">−</button>
            <button onClick={() => setTransposeStep(s => s + 1)} className="bg-white border px-2 rounded">+</button>
          </div>
        </div>

        {/* Content Layout: Lyrics + Chords */}
        <div className="flex flex-col md:flex-row gap-6">
          <MarkdownLyrics text={rawChordText} transposeStep={transposeStep} />
          <ChordDiagram chords={uniqueChords} />
        </div>

        {/* Tag Buttons */}
        <TagButtons tags={tags} />

      </div>
    </main>
  );
}
