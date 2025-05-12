'use client'

import { rotateChordMap } from '@/utils/transpose'

type Props = {
  currentKey: string
  setCurrentKey: (key: string) => void
  originalKey: string
}

export default function TransposeControls({ currentKey, setCurrentKey, originalKey }: Props) {
  const rotatedKeys = rotateChordMap(currentKey)

  return (
    <div className="flex flex-wrap items-center gap-3 mt-4">
      <span className="font-semibold text-white">คีย์เพลง:</span>

      <button
        onClick={() =>
          setCurrentKey(rotatedKeys[(rotatedKeys.length - 1) % rotatedKeys.length])
        }
        className="bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 px-3 py-1 rounded-full font-bold"
      >
        –
      </button>

      <select
        value={currentKey}
        onChange={(e) => setCurrentKey(e.target.value)}
        className="px-3 py-2 rounded-md border border-orange-300 text-orange-700 bg-white dark:bg-gray-800 dark:text-orange-200"
      >
        {rotatedKeys.map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>

      <button
        onClick={() =>
          setCurrentKey(rotatedKeys[1 % rotatedKeys.length])
        }
        className="bg-orange-100 hover:bg-orange-200 dark:bg-orange-900 dark:hover:bg-orange-800 px-3 py-1 rounded-full font-bold"
      >
        +
      </button>

      <button
        onClick={() => setCurrentKey(originalKey)}
        disabled={currentKey === originalKey}
        className="ml-2 px-4 py-1 rounded-md font-semibold border border-orange-400 text-orange-700 dark:text-orange-300 dark:border-orange-600 hover:bg-orange-100 dark:hover:bg-orange-800 disabled:opacity-40"
      >
        Original Key
      </button>
    </div>
  )
}
