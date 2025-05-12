export type AlignedLine = {
  chordLine: string
  lyricLine: string
}

export function parseChordLyricsFixed(text: string): AlignedLine[] {
  return text
    .trim()
    .split('\n')
    .map((line) => {
      let chordLine = ''
      let lyricLine = ''
      let buffer = ''
      let inChord = false

      for (const char of line) {
        if (char === '[') {
          inChord = true
          buffer = ''
        } else if (char === ']') {
          chordLine += buffer.padStart(lyricLine.length - chordLine.length, ' ')
          inChord = false
        } else {
          if (inChord) {
            buffer += char
          } else {
            lyricLine += char
            if (!inChord) chordLine += ' '
          }
        }
      }

      return { chordLine, lyricLine }
    })
}
