import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import AccountSidebar from "@/components/account/account-sidebar"
import NotificationsContent from "@/components/account/notifications-content"
import { Suspense } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata: Metadata = {
  title: "Notifications - Samba Tours & Travel",
  description: "Manage your notification preferences and settings",
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 bg-gray-50 flex">
        {/* Fixed Sidebar - Desktop */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] overflow-y-auto bg-white shadow-sm border rounded-lg m-4">
            <AccountSidebar />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div className="lg:hidden">
          <AccountSidebar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 lg:ml-64">
          <div className="container-max px-4 py-8">
            <Suspense fallback={<LoadingSpinner />}>
              <NotificationsContent />
            </Suspense>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
