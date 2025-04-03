import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (!session || !user?.user_metadata?.role || user.user_metadata.role !== 'admin') {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, Admin</h2>
          <p className="text-muted-foreground">Manage your platform and users here.</p>
        </div>
      </div>
    </div>
  )
}