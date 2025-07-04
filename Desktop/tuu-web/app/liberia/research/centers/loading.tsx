export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="h-12 bg-gray-200 rounded-lg mb-6 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg mb-8 animate-pulse" />
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-8 w-32 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 bg-gray-200 rounded-lg animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
