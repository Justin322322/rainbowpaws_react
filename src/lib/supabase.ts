import { createClient } from '@supabase/supabase-js'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_URL')
}

if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export const getDashboardPath = (role: string) => {
  switch (role.toLowerCase()) {
    case 'admin':
      return '/dashboard/admin'
    case 'furparent':
      return '/dashboard/fur-parent'
    case 'serviceprovider':
      return '/dashboard/service-provider'
    default:
      return '/'
  }
}