export type Song = {
  title: string
  artist: string
  chords: string[]
  lyrics: string
  slug?: string
}

type AlignedLine = {
  chordLine: string
  lyricLine: string
}
