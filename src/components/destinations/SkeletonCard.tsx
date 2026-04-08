export function SkeletonCategoryCard() {
  return (
    <div className="group cursor-pointer bg-white shadow-md overflow-hidden">
      <div className="relative h-60 overflow-hidden bg-gray-100">
        <div className="absolute inset-0 animate-pulse bg-gray-200" />
      </div>
      <div className="p-4">
        <div className="h-6 bg-gray-200 rounded animate-pulse w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
      </div>
    </div>
  );
}

export function SkeletonSafariCard() {
  return (
    <div className="block bg-white shadow-sm overflow-hidden">
      <div className="h-48 bg-gray-100">
        <div className="w-full h-full animate-pulse bg-gray-200" />
      </div>
      <div className="p-4 space-y-2">
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
      </div>
    </div>
  );
}