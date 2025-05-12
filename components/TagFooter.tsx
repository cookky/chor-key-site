'use client';

import Link from 'next/link';

const tags = ['แนะนำ', 'มาใหม่', 'ยอดนิยม', 'ฮิต', 'เพลงสดริง', 'เพลงเพื่อชีวิต', 'ลูกทุ่ง'];

export default function TagFooter() {
  return (
    <footer className="mt-10 pt-6 border-t">
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag) => (
          <Link href={`/tag/${encodeURIComponent(tag)}`} key={tag}>
            <span className="cursor-pointer bg-white border px-4 py-1 rounded-full text-sm text-gray-800 shadow-sm hover:bg-gray-100">
              {tag}
            </span>
          </Link>
        ))}
      </div>
      <footer className="text-center text-xs text-gray-500 py-4">
        © 2025 คอร์ดคีย์เพลง - พัฒนาเพื่อคนชอบเล่นเพลง
      </footer>
    </footer>
  );
}
