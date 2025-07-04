import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Unity University',
  description: 'Official website of The Unity University',
  generator: 'The Unity University',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
