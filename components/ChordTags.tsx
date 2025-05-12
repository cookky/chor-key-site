export default function ChordTags({ chords }: { chords: string[] }) {
  return (
    <div className="flex flex-wrap gap-3">
      {chords.map((chord) => (
        <span
          key={chord}
          className="bg-orange-100 dark:bg-orange-900/40 text-orange-800 dark:text-orange-300 px-4 py-1 rounded-full font-semibold text-sm shadow-inner"
        >
          🎸 {chord}
        </span>
      ))}
    </div>
  )
}
