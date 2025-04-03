"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  WrenchIcon,
  UserIcon,
  LogOutIcon,
  SettingsIcon,
  BellIcon,
  HelpCircleIcon,
  HomeIcon,
  FilterIcon as TransformIcon,
  CalendarIcon,
  UsersIcon,
  ClipboardIcon,
  BarChart3Icon,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function MainHeader() {
  const pathname = usePathname()
  const [notifications, setNotifications] = useState(3)

  // User information
  const user = {
    name: "Paul Ssekitto",
    role: "Officer Distribution Transformer Maintenance Engineer",
    email: "paul.ssekitto@uedcl.co.ug",
    avatar: "/placeholder.svg?height=40&width=40",
  }

  // Navigation items
  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: HomeIcon },
    { href: "/transformers", label: "Transformers", icon: TransformIcon },
    { href: "/maintenance", label: "Maintenance", icon: CalendarIcon },
    { href: "/teams", label: "Teams", icon: UsersIcon },
    { href: "/forms", label: "Forms", icon: ClipboardIcon },
    { href: "/reports", label: "Reports", icon: BarChart3Icon },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <WrenchIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">UEDCL Transformer Maintenance System</span>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
              return (
                <Button key={item.href} variant={isActive ? "secondary" : "ghost"} size="sm" asChild>
                  <Link href={item.href} className="flex items-center gap-1">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </Button>
              )
            })}
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <BellIcon className="h-5 w-5" />
                {notifications > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  >
                    {notifications}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <div className="p-2 text-sm border-b">
                  <div className="font-medium">Maintenance Due</div>
                  <div className="text-muted-foreground">TX-453721 is due for inspection tomorrow</div>
                  <div className="text-xs text-muted-foreground mt-1">2 hours ago</div>
                </div>
                <div className="p-2 text-sm border-b">
                  <div className="font-medium">Inspection Completed</div>
                  <div className="text-muted-foreground">Sarah Nambi completed inspection of TX-287654</div>
                  <div className="text-xs text-muted-foreground mt-1">5 hours ago</div>
                </div>
                <div className="p-2 text-sm">
                  <div className="font-medium">Critical Issue Reported</div>
                  <div className="text-muted-foreground">Oil leakage detected in TX-198342</div>
                  <div className="text-xs text-muted-foreground mt-1">Yesterday</div>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="justify-center text-center cursor-pointer">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 flex items-center gap-2 pl-2 pr-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>PS</AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate max-w-[150px]">{user.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <SettingsIcon className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  <span>Help</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOutIcon className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

