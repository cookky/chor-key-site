'use client';

import { useState } from 'react';

interface ChordTransposerProps {
  chords: string[];
  setChords: (chords: string[]) => void;
}

const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

function transposeChord(chord: string, steps: number): string {
  const index = notes.indexOf(chord);
  if (index === -1) return chord;
  const newIndex = (index + steps + notes.length) % notes.length;
  return notes[newIndex];
}

export default function ChordTransposer({ chords, setChords }: ChordTransposerProps) {
  const transpose = (steps: number) => {
    const transposed = chords.map(chord => transposeChord(chord, steps));
    setChords(transposed);
  };

  return (
    <div className="mb-4">
      <div className="flex items-center gap-2 mb-2">
        <button onClick={() => transpose(-1)} className="bg-gray-200 px-2 py-1 rounded">ลงคีย์</button>
        <button onClick={() => transpose(1)} className="bg-gray-200 px-2 py-1 rounded">ขึ้นคีย์</button>
      </div>
      <p className="text-lg">{chords.join(' ')}</p>
    </div>
  );
}
