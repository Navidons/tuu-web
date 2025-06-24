import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const contactDetails = [
  {
    icon: Phone,
    title: "Phone Numbers",
    items: [
      { label: "Main Office", value: "+256 700 123 456", href: "tel:+256700123456" },
      { label: "WhatsApp", value: "+256 700 123 456", href: "https://wa.me/256700123456" },
      { label: "Emergency", value: "+256 700 123 457", href: "tel:+256700123457" },
    ],
  },
  {
    icon: Mail,
    title: "Email Addresses",
    items: [
      { label: "General Inquiries", value: "info@sambatours.com", href: "mailto:info@sambatours.com" },
      { label: "Bookings", value: "bookings@sambatours.com", href: "mailto:bookings@sambatours.com" },
      { label: "Support", value: "support@sambatours.com", href: "mailto:support@sambatours.com" },
    ],
  },
  {
    icon: MapPin,
    title: "Office Locations",
    items: [
      { label: "Kampala HQ", value: "Plot 123, Kampala Road, Kampala", href: "https://maps.google.com" },
      { label: "Entebbe Office", value: "Airport Road, Entebbe", href: "https://maps.google.com" },
    ],
  },
]

export default function ContactInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-forest-600" />
          Get in Touch
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {contactDetails.map((section, index) => (
          <div key={index}>
            <h4 className="flex items-center gap-2 font-semibold text-earth-900 mb-3">
              <section.icon className="h-4 w-4 text-forest-600" />
              {section.title}
            </h4>
            <div className="space-y-2">
              {section.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex flex-col">
                  <span className="text-sm text-earth-600">{item.label}</span>
                  <a
                    href={item.href}
                    className="text-forest-600 hover:text-forest-700 font-medium hover:underline"
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  >
                    {item.value}
                  </a>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Quick Actions */}
        <div className="pt-4 border-t border-earth-200">
          <h4 className="font-semibold text-earth-900 mb-3">Quick Actions</h4>
          <div className="space-y-2">
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="https://wa.me/256700123456">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="tel:+256700123456">
                <Phone className="h-4 w-4 mr-2" />
                Call Now
              </a>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <a href="mailto:info@sambatours.com">
                <Mail className="h-4 w-4 mr-2" />
                Send Email
              </a>
            </Button>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-forest-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="h-4 w-4 text-forest-600" />
            <span className="font-semibold text-forest-900">Current Status</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm text-forest-700">Online - We're available now!</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
