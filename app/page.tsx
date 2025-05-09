'use client';

import { useState } from 'react';
import MarkdownLyrics from '../components/MarkdownLyrics';
import ChordDiagram from '../components/ChordDiagram';

const rawChordText = `
[G]เนื้อ[Gm]เพลง[C]เพราะ[G]มาก
[Em]อยาก[D]ร้อง[Bm]ให้เธอ[F]ฟัง
`;

export default function HomePage() {
  const [transposeStep, setTransposeStep] = useState(0);

  const chords = Array.from(
    new Set(rawChordText.match(/\[([A-G#bm7susdim]+)\]/g)?.map(c => c.replace(/\[|\]/g, '')) || [])
  );

  return (
    <div>
        {/* Title + Key Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">ตัวอย่างเพลง</h2>
            <p className="text-sm text-gray-600">ศิลปิน</p>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span>Key:</span>
            <button onClick={() => setTransposeStep(s => s - 1)} className="border px-2 py-1 rounded">−</button>
            <button onClick={() => setTransposeStep(s => s + 1)} className="border px-2 py-1 rounded">+</button>
          </div>
        </div>

        {/* Lyrics + Chords */}
        <div className="flex flex-col md:flex-row gap-6">
          <MarkdownLyrics text={rawChordText} transposeStep={transposeStep} />
          <ChordDiagram chords={chords.map(c => transposeChord(c, transposeStep))} />
        </div>
      </div>
  );
}

function transposeChord(chord: string, steps: number): string {
  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const base = chord.replace(/m|7|sus|dim|\d+/gi, '');
  const index = NOTES.indexOf(base);
  if (index === -1) return chord;
  const newIndex = (index + steps + NOTES.length) % NOTES.length;
  return chord.replace(base, NOTES[newIndex]);
}
