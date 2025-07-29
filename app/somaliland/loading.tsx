import LoadingSpinner from "@/components/somaliland/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-red-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-red-600 shadow-lg mx-auto mb-4">
            <img 
              src="/tuu-logo/tuu-logo.png" 
              alt="The Unity University Logo" 
              className="h-12 w-12 object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-700 to-red-700 bg-clip-text text-transparent">
            Unity University
          </h2>
          <p className="text-gray-600 mt-2">Somaliland Campus</p>
        </div>

        <LoadingSpinner size="lg" color="green" />

        <p className="text-gray-600 mt-4">Loading...</p>
      </div>
    </div>
  )
}
