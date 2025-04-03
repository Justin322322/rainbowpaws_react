import { supabase } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export default async function FurParentDashboard() {
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user: { user_metadata } } } = await supabase.auth.getUser()

  if (!session || user_metadata.role !== 'furParent') {
    redirect('/')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Fur Parent Dashboard</h1>
      <div className="grid gap-6">
        <div className="p-6 bg-card rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Welcome, {user_metadata.firstName}</h2>
          <p className="text-muted-foreground">Manage your pet services and appointments here.</p>
        </div>
      </div>
    </div>
  )
}