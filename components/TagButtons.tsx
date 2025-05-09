'use client';

import Link from 'next/link';

interface TagButtonsProps {
  tags: string[];
}

export default function TagButtons({ tags }: TagButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 pt-4">
      {tags.map((tag) => (
        <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>
          <span className="cursor-pointer bg-white border px-4 py-1 rounded-full text-sm text-gray-800 shadow-sm hover:bg-gray-100">
            {tag}
          </span>
        </Link>
      ))}
    </div>
  );
}
