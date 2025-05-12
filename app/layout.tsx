// ตัวอย่าง (layout.tsx)
import './globals.css'
import { Prompt } from 'next/font/google'
const prompt = Prompt({ subsets: ['thai'], weight: ['400', '600', '700'], variable: '--font-prompt' })


export const metadata = {
  title: 'คอร์ดคีย์เพลง',
  description: 'แหล่งรวมคอร์ดเพลงที่ปรับคีย์ได้',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={prompt.variable}>
      <body className="font-sans bg-white text-gray-800">{children}</body>
    </html>
  )
}
