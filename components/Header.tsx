'use client';
export default function Header() {
  return (
    <div className="flex justify-between items-center border-b pb-4">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">คอร์ดคีย์เพลง</h1>
        <p className="text-sm text-gray-500">สร้างภาพเพลงด้วย AI</p>
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder="ค้นหาเพลง..."
          className="border border-gray-300 rounded-full px-4 py-1 text-sm w-56"
        />
        <span className="absolute right-3 top-1.5 text-gray-500">🔍</span>
      </div>
    </div>
  );
}
