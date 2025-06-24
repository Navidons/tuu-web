import type { Metadata } from "next"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import CartContent from "@/components/cart/cart-content"
import { Suspense } from "react"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata: Metadata = {
  title: "Shopping Cart - Samba Tours & Travel",
  description: "Review your selected tours and proceed to booking",
}

export default function CartPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50">
        <div className="container-max px-4 py-8">
          <Suspense fallback={<LoadingSpinner />}>
            <CartContent />
          </Suspense>
        </div>
      </div>
      <Footer />
    </>
  )
}
