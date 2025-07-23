"use client"

import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useResponsive } from '@/hooks/use-mobile'

export default function SomalilandFooter() {
  const { isMobile } = useResponsive()

  const socialLinks = [
    { 
      icon: Facebook, 
      href: "https://www.facebook.com/theunityuniversity", 
      label: "Facebook",
      ariaLabel: "Follow us on Facebook" 
    },
    { 
      icon: Twitter, 
      href: "#", 
      label: "Twitter",
      ariaLabel: "Follow us on Twitter" 
    },
    { 
      icon: Instagram, 
      href: "https://www.instagram.com/explore/locations/104837471861628/the-unity-university/", 
      label: "Instagram",
      ariaLabel: "Follow us on Instagram" 
    },
    { 
      icon: Linkedin, 
      href: "https://so.linkedin.com/company/the-unity-university", 
      label: "LinkedIn",
      ariaLabel: "Connect with us on LinkedIn" 
    },
    { 
      icon: Youtube, 
      href: "#", 
      label: "YouTube",
      ariaLabel: "Subscribe to our YouTube channel" 
    },
  ]

  const academicLinks = [
    { 
      name: "All Programs", 
      href: "/somaliland/academics"
    },
    { 
      name: "Undergraduate Programs", 
      href: "/somaliland/academics/undergraduate"
    },
    { 
      name: "Graduate Programs", 
      href: "/somaliland/academics/graduate"
    },
  ]

  const admissionsLinks = [
    { 
      name: "General Admissions", 
      href: "/somaliland/admissions"
    },
    { 
      name: "Apply Now", 
      href: "/admissions/apply",
      external: true
    },
  ]

  const legalLinks: typeof academicLinks = []

  const renderLinks = (links: typeof academicLinks) => (
    <ul className="space-y-2">
      {links.map((link) => {
        const linkProps = 'external' in link && link.external 
          ? { target: "_blank", rel: "noopener noreferrer" } 
          : {};
        
        return (
          <li key={link.href}>
            <Link 
              href={link.href} 
              {...linkProps}
              className="text-gray-400 transition-colors hover:text-white block py-2 text-sm"
            >
              {link.name}
            </Link>
          </li>
        );
      })}
    </ul>
  )

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className={`
          grid 
          gap-8 
          ${isMobile 
            ? 'grid-cols-2' 
            : 'md:grid-cols-2 lg:grid-cols-4'
          }
        `}>
          {/* First Column: About */}
          <div className={`${isMobile ? 'col-span-2' : ''}`}>
            <div className="mb-4 flex items-center">
              <img 
                src="/tuu-logo/tuu-logo.png" 
                alt="The Unity University Logo" 
                className="h-12 w-12 object-contain mr-3" 
                loading="lazy"
              />
              <div>
                <span className="text-xl font-bold">The Unity University</span>
                <div className="text-xs text-gray-400">Somaliland Campus</div>
              </div>
            </div>
            <p className="mb-6 text-gray-400 text-sm">
              What begins here, transforms Africa. Leading through innovation and academic excellence in
              Somaliland since 2020.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const linkProps = social.href !== "#" 
                  ? { target: "_blank", rel: "noopener noreferrer" } 
                  : {};
                
                return (
                  <Link 
                    key={social.label} 
                    href={social.href} 
                    {...linkProps}
                    className="text-gray-400 transition-colors hover:text-green-500 touch-manipulation"
                    aria-label={social.ariaLabel}
                  >
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Academics Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Academics
            </h3>
            {renderLinks(academicLinks)}
          </div>

          {/* Admissions Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Admissions
            </h3>
            {renderLinks(admissionsLinks)}
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">
              Contact & Information
            </h3>
            <ul className="mb-6 space-y-4">
              <li className="flex items-center touch-manipulation">
                <MapPin className="mr-2 h-5 w-5 text-green-500" />
                <div>
                  <span className="text-gray-400 text-sm">
                    Jigjiga Yar Street near Masjid Jabir
                  </span>
                  <div className="text-xs text-gray-500">Hargeisa, Somaliland</div>
                </div>
              </li>
              <li className="flex items-center touch-manipulation">
                <Phone className="mr-2 h-5 w-5 text-green-500" />
                <a 
                  href="tel:+25263421013" 
                  className="text-gray-400 text-sm hover:text-green-500"
                >
                  +252 634 210013
                </a>
              </li>
              <li className="flex items-center touch-manipulation">
                <Mail className="mr-2 h-5 w-5 text-green-500" />
                <a 
                  href="mailto:theunityuniversity@gmail.com" 
                  className="text-gray-400 text-sm hover:text-green-500"
                >
                  theunityuniversity@gmail.com
                </a>
              </li>
            </ul>
            
            {/* Newsletter Section */}
            <div>
              <h4 className="mb-2 font-semibold text-sm">
                Newsletter
              </h4>
              <form className="space-y-2">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="
                    border-gray-700 
                    bg-gray-800 
                    text-white 
                    placeholder:text-gray-500
                    py-2.5 
                    text-sm
                  "
                  aria-label="Newsletter Email"
                />
                <Button 
                  className="
                    w-full 
                    bg-gradient-to-r 
                    from-green-600 
                    to-red-600 
                    text-white 
                    hover:from-green-700 
                    hover:to-red-700
                    py-2.5
                    text-sm
                  "
                  aria-label="Subscribe to Newsletter"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className={`
            flex 
            ${isMobile 
              ? 'flex-col items-center space-y-4' 
              : 'flex-row justify-between items-center'
            }
          `}>
            <p className="text-sm text-gray-400 text-center">
              &copy; 2020-{new Date().getFullYear()} The Unity University Somaliland Campus. All rights reserved.
            </p>
            <div className={`
              flex 
              ${isMobile 
                ? 'flex-col items-center space-y-2' 
                : 'space-x-6'
              }
            `}>
              {renderLinks(legalLinks)}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
