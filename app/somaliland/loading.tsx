import LoadingSpinner from "@/components/somaliland/loading-spinner"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-red-50">
      <div className="text-center">
        <div className="mb-8">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-600 to-red-600 shadow-lg mx-auto mb-4">
            <svg viewBox="0 0 200 200" className="h-8 w-8 text-white">
              <path
                fill="currentColor"
                d="M102.5,10c-50.7,0-91.7,41-91.7,91.7s41,91.7,91.7,91.7s91.7-41,91.7-91.7S153.2,10,102.5,10z M159.7,148.5
                c-14.4,21.5-38.9,35.7-66.8,35.7c-44.3,0-80.2-35.9-80.2-80.2c0-44.3,35.9-80.2,80.2-80.2c27.9,0,52.4,14.2,66.8,35.7
                c-9.3-4.5-19.8-7-30.8-7c-39.5,0-71.5,32-71.5,71.5s32,71.5,71.5,71.5C139.9,155.5,150.4,153,159.7,148.5z"
              />
            </svg>
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
