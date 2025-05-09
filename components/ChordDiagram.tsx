'use client';

import Image from 'next/image';

interface ChordDiagramProps {
  chords: string[];
}

export default function ChordDiagram({ chords }: ChordDiagramProps) {
  return (
    <div className="basis-1/3 grid grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
      {chords.map((chord) => (
        <div key={chord} className="flex flex-col items-center">
          <Image
            src={`/chords/${chord}.png`}
            alt={chord}
            width={60}
            height={80}
          />
          <p className="mt-2 font-medium">{chord}</p>
        </div>
      ))}
    </div>
  );
}
