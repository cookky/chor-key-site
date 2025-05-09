'use client';

export default function Header() {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-b pb-4 gap-3">
      <div>
        <h1 className="text-3xl font-extrabold text-gray-900">คอร์ดคีย์เพลง</h1>
        <p className="text-sm text-gray-500">สร้างภาพเพลงด้วย AI</p>
      </div>
      <input
        type="text"
        placeholder="ค้นหาเพลง..."
        className="border border-gray-300 text-gray-800 rounded-full px-4 py-1 text-sm w-full sm:w-56"
      />
    </div>
  );
}
