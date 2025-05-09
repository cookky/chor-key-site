import './globals.css';
import Header from '../components/Header';
import TagFooter from '../components/TagFooter';

export const metadata = {
  title: 'คอร์ดคีย์เพลง',
  description: 'แสดงคอร์ดจาก Markdown และปรับคีย์อัตโนมัติ',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body className="bg-gray-100 text-gray-900">
      <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow space-y-6">
        <Header />
        <main className="min-h-[80vh] max-w-5xl mx-auto px-4 py-6">{children}</main>
        <TagFooter />
        </div>
        </main>
      </body>
    </html>
  );
}
