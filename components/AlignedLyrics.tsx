'use client'

type Props = {
  lyrics: string
}

export default function AlignedLyrics({ lyrics }: Props) {
  return (
    <div className="mt-6 border-t pt-6 text-left">
      <pre className="whitespace-pre-wrap font-mono text-base md:text-lg leading-relaxed text-white">
        {lyrics}
      </pre>
    </div>
  )
}

