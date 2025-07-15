"use client"

import { useState } from "react"
import LiberiaNavbar from "@/components/liberia/liberia-navbar"
import LiberiaFooter from "@/components/liberia/liberia-footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react"
import { motion } from "framer-motion"

export default function LiberiaContactPage() {
  const [sending, setSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  const handleChange = (field: string, value: string) => setForm({ ...form, [field]: value })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    await new Promise((res) => setTimeout(res, 1500))
    setSending(false)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
    setForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <LiberiaNavbar />

      {/* Hero */}
      <section className="bg-gradient-to-r from-red-700 to-blue-700 text-white py-20 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg md:text-2xl mx-auto max-w-2xl">
          Have questions or need assistance? We're here to help you connect with The Unity University Liberia Campus - our newest expansion bringing Pan-African education to West Africa.
        </p>
      </section>

      {/* Info & Form */}
      <section className="flex-1 py-20 bg-gray-50">
        <div className="container mx-auto px-4 grid gap-12 lg:grid-cols-2">
          {/* Contact Info Cards */}
          <div className="grid gap-8 sm:grid-cols-2">
            {[
              {
                title: "Address",
                icon: MapPin,
                text: "The Unity University Campus, Monrovia, Montserrado County, Liberia",
                color: "bg-red-100 text-red-600",
              },
              {
                title: "Phone",
                icon: Phone,
                text: "+252 63 4210013",
                color: "bg-blue-100 text-blue-600",
              },
              {
                title: "Email",
                icon: Mail,
                text: "liberia@tuu.university",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                title: "Hours",
                icon: Clock,
                text: "Mon - Fri: 8:00 AM - 5:00 PM",
                color: "bg-yellow-100 text-yellow-600",
              },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto mb-4 p-3 rounded-full w-16 h-16 flex items-center justify-center ${item.color}`}> 
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm whitespace-pre-line">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg p-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <CardHeader>
              <CardTitle>Send Us a Message</CardTitle>
            </CardHeader>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
              />
              <Input
                type="email"
                placeholder="Email Address"
                value={form.email}
                onChange={(e) => handleChange("email", e.target.value)}
                required
              />
              <Input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                required
              />
              <Textarea
                placeholder="Your message"
                rows={5}
                value={form.message}
                onChange={(e) => handleChange("message", e.target.value)}
                required
              />
              <Button type="submit" disabled={sending} className="w-full bg-red-600 hover:bg-red-700">
                {sending ? "Sending..." : sent ? "Sent!" : <span className="flex items-center justify-center">Send <Send className="ml-2 h-4 w-4" /></span>}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <LiberiaFooter />
    </div>
  )
} 