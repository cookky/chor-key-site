// components/HeroSection.tsx
import Image from 'next/image'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-orange-400 to-orange-300 py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto flex flex-col-reverse md:flex-row items-center justify-between px-6">
        {/* Left Text */}
        <div className="text-center md:text-left max-w-xl space-y-6 z-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white leading-snug">
            คอร์ด <br /> คีย์เพลง
          </h1>
          <p className="text-white text-lg font-light">
            แหล่งรวมคอร์ดเพลงที่คุณสามารถปรับคีย์ได้ตามใจ
          </p>
          <Link
            href="/songs"
            className="inline-block bg-white text-orange-500 font-semibold rounded-full py-3 px-6 hover:bg-orange-100 transition"
          >
            ดูคอร์ดเพลงทั้งหมด
          </Link>
        </div>

        {/* Right Image */}
        <div className="relative z-10 w-[250px] md:w-[350px] lg:w-[400px] mb-10 md:mb-0">
          <Image
            src="/hero-anime.png"
            alt="Anime Girl with Guitar"
            width={400}
            height={400}
            className="w-full h-auto drop-shadow-xl"
            priority
          />
        </div>
      </div>

      {/* Bottom Wave Transition */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[80px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 80"
          preserveAspectRatio="none"
        >
          <path
            fill="#fff"
            d="M0,32L80,37.3C160,43,320,53,480,53.3C640,53,800,43,960,37.3C1120,32,1280,32,1360,32L1440,32L1440,80L1360,80C1280,80,1120,80,960,80C800,80,640,80,480,80C320,80,160,80,80,80L0,80Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}
