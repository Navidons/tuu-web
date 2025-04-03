"use client"

import { useAuth } from "@/providers/auth-provider"
import { MainNav } from "@/components/main-nav"
import { ModeToggle } from "@/components/ui/mode-toggle"

export function FieldLayout({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg">Transformer Maintenance System</span>
            <MainNav />
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Logged in as:</span>
              <span className="font-medium">{user?.name}</span>
            </div>
            <ModeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container py-6">
        {children}
      </main>

      <footer className="border-t bg-background">
        <div className="container py-4">
          <p className="text-sm text-muted-foreground text-center">
            Field Data Collection System - Version 1.0
          </p>
        </div>
      </footer>
    </div>
  )
} 