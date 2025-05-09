import './globals.css';

export const metadata = {
  title: 'คอร์ดคีย์เพลง',
  description: 'แสดงคอร์ดและเนื้อเพลงพร้อมฟีเจอร์ปรับคีย์',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
