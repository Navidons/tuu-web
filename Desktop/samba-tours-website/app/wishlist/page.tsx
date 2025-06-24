import type { Metadata } from "next"
import WishlistContent from "@/components/wishlist/wishlist-content"
import AccountSidebar from "@/components/account/account-sidebar"
import { Suspense } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata: Metadata = {
  title: "My Wishlist - Samba Tours & Travel",
  description: "Your saved tours and destinations",
}

export default function WishlistPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-max px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <AccountSidebar />
          </div>
          <div className="lg:col-span-3">
            <Suspense fallback={<LoadingSpinner />}>
              <WishlistContent />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
