export default function LyricsWithChords({ lines }: { lines: ChordWord[][] }) {
  return (
    <div className="space-y-4 font-mono text-lg">
      {lines.map((line, i) => (
        <div key={i}>
          <div className="flex relative">
            {line.map((part, j) => (
              <div key={j} className="inline-block text-center min-w-[1ch]">
                <div className="text-blue-500 font-bold leading-none h-5">{part.chord || ''}</div>
                <span>{part.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
