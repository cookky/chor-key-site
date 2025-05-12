type Props = {
  title: string
  artist: string
}

export default function SongHeader({ title, artist }: Props) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-orange-400 drop-shadow">{title}</h1>
      <p className="text-gray-300">ศิลปิน: <span className="font-medium text-white">{artist}</span></p>
    </div>
  )
}
