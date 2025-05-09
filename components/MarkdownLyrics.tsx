'use client';

interface MarkdownLyricsProps {
  text: string;
  transposeStep: number;
}

export default function MarkdownLyrics({ text, transposeStep }: MarkdownLyricsProps) {
  const lines = parseChordLyrics(text);

  return (
    <div className="space-y-4 text-sm basis-full md:basis-2/3">
      {lines.map((line, idx) => (
        <div key={idx}>
          <div className="font-mono text-gray-800 whitespace-pre">
            {line.chords.map(ch => transposeChord(ch, transposeStep).padEnd(6)).join('')}
          </div>
          <div className="text-gray-900">{line.words.join('')}</div>
        </div>
      ))}
    </div>
  );
}

function transposeChord(chord: string, steps: number): string {
  const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const base = chord.replace(/m|7|sus|dim|\d+/gi, '');
  const index = NOTES.indexOf(base);
  if (index === -1) return chord;
  const newIndex = (index + steps + NOTES.length) % NOTES.length;
  return chord.replace(base, NOTES[newIndex]);
}

function parseChordLyrics(text: string) {
  const lines = text.trim().split('\n');
  return lines.map(line => {
    const chords: string[] = [];
    const words: string[] = [];
    let current = '';
    let isChord = false;

    for (const char of line) {
      if (char === '[') {
        isChord = true;
        if (current) words.push(current);
        current = '';
      } else if (char === ']') {
        isChord = false;
        chords.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    if (current) words.push(current);
    return { chords, words };
  });
}
