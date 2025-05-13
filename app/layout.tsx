// app/layout.tsx
import './globals.css'
import { Noto_Sans_Thai } from 'next/font/google'
import SearchBar from '@/components/SearchBar'

const noto = Noto_Sans_Thai({ subsets: ['thai'], weight: ['400', '700'] })

export const metadata = {
  title: 'คอร์ดคีย์เพลง',
  description: 'รวมคอร์ดเพลงที่สามารถปรับคีย์ได้',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th">
      <body>
        <SearchBar />
        {children}
      </body>
    </html>
  )
}
