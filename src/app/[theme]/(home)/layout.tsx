export default function HomeLayout({
  header,
  children,
}: {
  header: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <>
      {header}
      {children}
    </>
  )
}
