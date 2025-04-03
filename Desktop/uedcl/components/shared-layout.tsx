import type React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { WrenchIcon } from "lucide-react"

interface SharedLayoutProps {
  children: React.ReactNode
}

export function SharedLayout({ children }: SharedLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex items-center gap-2">
            <WrenchIcon className="h-6 w-6 text-primary" />
            <span className="hidden font-bold sm:inline-block">UEDCL Transformer Maintenance System</span>
          </div>
          <nav className="flex flex-1 items-center justify-end space-x-1">
            <Button variant="ghost" asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/transformers">Transformers</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/maintenance">Maintenance</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/teams">Teams</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/forms">Forms</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link href="/reports">Reports</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
    </div>
  )
}

