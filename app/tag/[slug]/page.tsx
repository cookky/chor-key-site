import TagFooter from '../../../components/TagFooter';

export default function TagPage({ params }: { params: { slug: string } }) {
  return (
    <main className="min-h-screen bg-white py-10 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">หมวดหมู่: {decodeURIComponent(params.slug)}</h1>
        <p className="text-gray-600">แสดงเพลงทั้งหมดในหมวดหมู่นี้</p>

        <TagFooter />
      </div>
    </main>
  );
}
