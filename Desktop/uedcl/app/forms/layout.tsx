export default function FormsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex-1">
      {/* REMOVE any MainHeader or Navbar components from here */}
      {children}
    </div>
  )
} 