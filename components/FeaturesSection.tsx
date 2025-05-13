// components/FeaturesSection.tsx
import { FaGuitar, FaMusic, FaRegEdit } from 'react-icons/fa'

const features = [
  {
    icon: <FaGuitar className="text-orange-500 text-3xl" />,
    title: 'ปรับคีย์เพลงได้',
    description: 'เปลี่ยนคีย์ได้ง่าย ๆ ด้วยปุ่ม + / -',
  },
  {
    icon: <FaRegEdit className="text-blue-500 text-3xl" />,
    title: 'วิธีจับคอร์ด',
    description: 'มีภาพประกอบการจับคอร์ดในแต่ละเพลง',
  },
  {
    icon: <FaMusic className="text-purple-500 text-3xl" />,
    title: 'รองรับหลายแนวเพลง',
    description: 'ป๊อป / ร็อก / ลูกทุ่ง / อินดี้',
  },
]

export default function FeaturesSection() {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-orange-50 rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition"
          >
            <div className="mb-4 flex justify-center">{f.icon}</div>
            <h3 className="text-lg font-semibold text-gray-800">{f.title}</h3>
            <p className="text-sm text-gray-600 mt-2">{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
