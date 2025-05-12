'use client'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="font-sans text-gray-800 bg-white">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-orange-500 via-orange-400 to-orange-100 text-white px-6 md:px-20 py-24 rounded-b-[4rem] overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10 z-10 relative">
        <div className="max-w-xl space-y-6 text-center md:text-left">
          <h1 className="text-5xl font-bold drop-shadow-xl">คอร์ดคีย์เพลง</h1>
          <p className="text-lg drop-shadow-sm">แหล่งรวมคอร์ดเพลงที่คุณสามารถปรับคีย์ได้ตามใจ</p>
          <button className="bg-white text-orange-600 font-semibold px-6 py-2 rounded-full shadow-md hover:bg-orange-100 transition">
            ดูคอร์ดเพลงทั้งหมด
          </button>
        </div>
        <div className="flex justify-center">
          <Image
            src="/girl-guitar.png"
            alt="Guitar Girl"
            width={380}
            height={380}
            className="drop-shadow-2xl"
            priority
          />
        </div>
      </div>

      {/* WAVE SVG: ใช้แทน skew */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 320">
        <path
          fill="#ffffff"
          fillOpacity="1"
          d="M0,224L80,218.7C160,213,320,203,480,176C640,149,800,107,960,96C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        />
      </svg>
    </section>


      {/* FEATURES SECTION */}
      <section className="bg-white py-16 px-6 md:px-20">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center">
          {[
            { title: '🎚️ ปรับคีย์เพลงได้', desc: 'เปลี่ยนคีย์ได้ง่าย ๆ ด้วยปุ่ม - / +' },
            { title: '📘 วิธีจับคอร์ด', desc: 'มีภาพประกอบการจับคอร์ดในแต่ละเพลง' },
            { title: '🎶 รองรับหลายแนวเพลง', desc: 'ป๊อป / ร็อก / ลูกทุ่ง / อินดี้' },
          ].map(({ title, desc }) => (
            <div key={title} className="bg-orange-50 p-6 rounded-xl shadow hover:shadow-md transition">
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SONG LIST SECTION */}
      <section className="bg-orange-50 py-16 px-6 md:px-20">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-6">🎵 ตัวอย่างเพลงยอดนิยม</h2>
          <ul className="space-y-3 text-left text-gray-700">
            <li>🎤 ศิลปิน: XYZ — คอร์ด: <span className="font-semibold">G D Em C</span>
              <Link href="/songs/song-1" className="text-orange-600 hover:underline">ดูคอร์ดเพลงนี้</Link>
            </li>
            <li>🎤 ศิลปิน: XYZ — คอร์ด: <span className="font-semibold">C Am F G</span></li>
            <li>🎤 ศิลปิน: XYZ — ดูคอร์ดเพิ่มเติม…</li>
          </ul>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {['ป๊อป', 'ร็อก', 'ลูกทุ่ง', 'อินดี้', 'เพื่อชีวิต'].map((tag) => (
              <span
                key={tag}
                className="bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-semibold"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-sm text-gray-500 py-6">
        © 2025 คอร์ดคีย์เพลง — สร้างเพื่อคนรักดนตรี 🎸
      </footer>
    </main>
  )
}
