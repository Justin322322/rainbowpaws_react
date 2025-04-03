import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default async function FurParentDashboard() {
  const { data: { session } } = await supabase.auth.getSession()
  const { data: { user } } = await supabase.auth.getUser()

  if (!session || !user?.user_metadata?.role || user.user_metadata.role !== 'furParent') {
    redirect('/')
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user.user_metadata.first_name}!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard content will go here */}
      </div>
    </div>
  )
}