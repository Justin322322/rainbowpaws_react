import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: { session } } = await supabase.auth.getSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-6 px-4 overflow-y-auto custom-scrollbar max-h-[calc(100vh-4rem)]">
        {children}
      </main>
    </div>
  )
}