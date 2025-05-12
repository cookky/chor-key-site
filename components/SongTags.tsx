// components/SongTags.tsx
type SongTagsProps = {
  tags: string[]
}

export default function SongTags({ tags }: SongTagsProps) {
  if (!tags || tags.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 text-sm text-orange-700 dark:text-orange-300">
      {tags.map((tag) => (
        <span
          key={tag}
          className="bg-orange-100 dark:bg-orange-900 px-3 py-1 rounded-full shadow text-sm font-semibold"
        >
          #{tag}
        </span>
      ))}
    </div>
  )
}
