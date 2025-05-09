'use client';

interface TagButtonsProps {
  tags: string[];
}

export default function TagButtons({ tags }: TagButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-4">
      {tags.map((tag) => (
        <button
          key={tag}
          className="bg-white border px-4 py-1 rounded-full text-sm text-gray-800 shadow-sm"
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
