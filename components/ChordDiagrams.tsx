import Image from 'next/image'

export default function ChordDiagrams({ chords }: { chords: string[] }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-8">
      {chords.map((chord) => {
        const imageName = chord.replace('#', 's').replace('b', 'b')
        return (
          <div key={chord} className="flex flex-col items-center">
            <Image
              src={`/chords/${imageName}.png`}
              alt={chord}
              width={80}
              height={80}
              className="rounded-md shadow"
            />
            <span className="mt-1 text-sm font-semibold">{chord}</span>
          </div>
        )
      })}
    </div>
  )
}
