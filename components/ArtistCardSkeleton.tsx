// components/ArtistCardSkeleton.tsx
export default function ArtistCardSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
      <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg mb-3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
    </div>
  )
}
