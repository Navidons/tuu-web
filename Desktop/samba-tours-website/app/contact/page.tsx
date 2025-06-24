import { Suspense } from "react"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import ContactHero from "@/components/contact/contact-hero"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import ContactMethods from "@/components/contact/contact-methods"
import ContactMap from "@/components/contact/contact-map"
import OfficeHours from "@/components/contact/office-hours"
import EmergencyContact from "@/components/contact/emergency-contact"
import VideoCallBooking from "@/components/contact/video-call-booking"
import CallbackRequest from "@/components/contact/callback-request"
import SocialConnect from "@/components/contact/social-connect"
import ContactFAQ from "@/components/contact/contact-faq"
import LoadingSpinner from "@/components/ui/loading-spinner"

export const metadata = {
  title: "Contact Samba Tours & Travel - Plan Your Uganda Adventure",
  description:
    "Get in touch with Samba Tours & Travel to plan your perfect Uganda adventure. Contact our expert travel consultants for personalized tour recommendations and bookings.",
  keywords:
    "contact Uganda tours, travel consultation, safari booking, gorilla trekking inquiry, Uganda travel agent contact",
  openGraph: {
    title: "Contact Samba Tours & Travel - Plan Your Uganda Adventure",
    description: "Get in touch with our expert travel consultants to plan your perfect Uganda adventure.",
    images: ["/images/contact-hero.jpg"],
  },
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-cream-50">
        <ContactHero />

        <section className="section-padding">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
              <div>
                <Suspense fallback={<LoadingSpinner />}>
                  <ContactForm />
                </Suspense>
              </div>
              <div className="space-y-8">
                <ContactInfo />
                <ContactMethods />
                <OfficeHours />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <EmergencyContact />
              <VideoCallBooking />
              <CallbackRequest />
            </div>

            <div className="mb-16">
              <Suspense fallback={<LoadingSpinner />}>
                <ContactMap />
              </Suspense>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <SocialConnect />
              <Suspense fallback={<LoadingSpinner />}>
                <ContactFAQ />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
