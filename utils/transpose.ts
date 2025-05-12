// === Base Chord Map (12 notes) ===
export const baseChordMap = ['C', 'C#', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'G#', 'A', 'Bb', 'B']

// === Mapping for sharp <=> flat ===
export const flatToSharpMap: Record<string, string> = {
  Db: 'C#',
  Eb: 'D#',
  Gb: 'F#',
  Ab: 'G#',
  Bb: 'A#',
}

export const sharpToFlatMap: Record<string, string> = {
  'C#': 'C#',
  'D#': 'Eb',
  'F#': 'F#',
  'G#': 'G#',
  'A#': 'Bb',
}

// === Get index shift between keys ===
export function getStep(from: string, to: string): number {
  const fromIndex = baseChordMap.indexOf(from)
  const toIndex = baseChordMap.indexOf(to)
  if (fromIndex === -1 || toIndex === -1) return 0
  return toIndex - fromIndex
}

// === Rotate chord list so that currentKey comes first (e.g. G → ['G', 'G#', ...]) ===
export function rotateChordMap(currentKey: string): string[] {
  const idx = baseChordMap.indexOf(currentKey)
  if (idx === -1) return baseChordMap
  return [...baseChordMap.slice(idx), ...baseChordMap.slice(0, idx)]
}

// === Transpose a single chord with suffix ===
export function transposeChord(chord: string, step: number, useFlat = false): string {
  const match = chord.match(/^([A-G][#b]?)(.*)$/)
  if (!match) return chord

  let [_, root, suffix] = match

  if (flatToSharpMap[root]) root = flatToSharpMap[root]
  const index = baseChordMap.indexOf(root)
  if (index === -1) return chord

  let newRoot = baseChordMap[(index + step + baseChordMap.length) % baseChordMap.length]
  if (useFlat && sharpToFlatMap[newRoot]) newRoot = sharpToFlatMap[newRoot]

  return newRoot + suffix
}

// === Transpose entire lyrics text ===
export function transposeLyricsText(text: string, step: number, useFlat = false): string {
  return text.replace(/\b([A-G][#b]?[^ \n\t]*)\b/g, (chord) => transposeChord(chord, step, useFlat))
}

export function parseChordLyrics(text: string): { chordLine: string | null; lyricLine: string }[] {
  const lines = text.split('\n')

  return lines.map(line => {
    const chordLine = /^[ \t]*[A-G][#b]?/.test(line) ? line : null
    return {
      chordLine,
      lyricLine: chordLine ? '' : line,
    }
  })
}