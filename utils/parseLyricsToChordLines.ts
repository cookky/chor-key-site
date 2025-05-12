export type LinePair = {
  chordLine: string
  lyricLine: string
}

export function parseLyricsWithChordLines(text: string, step = 0, useFlat = true): LinePair[] {
  const lines = text.trim().split('\n')
  const result: LinePair[] = []

  for (const raw of lines) {
    if (!raw.trim()) {
      result.push({ chordLine: '', lyricLine: '' })
      continue
    }

    let chordLine = ''
    let lyricLine = ''
    let currentChord = ''
    let isChord = false

    for (let i = 0; i < raw.length; i++) {
      const char = raw[i]

      if (char === '[') {
        isChord = true
        currentChord = ''
      } else if (char === ']') {
        isChord = false
        const transposed = transposeChordLine(currentChord, step, useFlat)
        chordLine += transposed.padEnd(currentChord.length, ' ')
      } else if (isChord) {
        currentChord += char
      } else {
        lyricLine += char
        chordLine += ' '
      }
    }

    result.push({ chordLine, lyricLine })
  }

  return result
}

function transposeChordLine(chord: string, step: number, useFlat: boolean): string {
  const match = chord.match(/^([A-G][#b]?)(.*)$/)
  if (!match) return chord

  let [_, root, suffix] = match
  const chordMap = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
  const flatToSharpMap: Record<string, string> = {
    Db: 'C#', Eb: 'D#', Gb: 'F#', Ab: 'G#', Bb: 'A#'
  }
  const sharpToFlatMap: Record<string, string> = {
    'C#': 'Db', 'D#': 'Eb', 'F#': 'Gb', 'G#': 'Ab', 'A#': 'Bb'
  }

  if (flatToSharpMap[root]) root = flatToSharpMap[root]
  const index = chordMap.indexOf(root)
  if (index === -1) return chord

  let newRoot = chordMap[(index + step + chordMap.length) % chordMap.length]
  if (useFlat && sharpToFlatMap[newRoot]) newRoot = sharpToFlatMap[newRoot]
  return newRoot + suffix
}
