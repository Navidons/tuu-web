import type { Metadata } from "next"
import BookingsContent from "@/components/bookings/bookings-content"
import AccountSidebar from "@/components/account/account-sidebar"
import { Suspense } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata: Metadata = {
  title: "My Bookings - Samba Tours & Travel",
  description: "View and manage your tour bookings",
}

export default function BookingsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <BookingsContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
