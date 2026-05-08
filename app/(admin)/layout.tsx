// app/dashboard/layout.tsx
'use client'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // 🌟 여기서 사이드바나 헤더를 다 지워야 합니다! 
  // 모든 건 이제 page.tsx(사령탑)가 관리합니다.
  return (
    <section className="min-h-screen bg-[#F9F9F9]">
      {children}
    </section>
  )
}