import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://pxtakrpkzzpbrlbkykav.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4dGFrcnBrenpwYnJsYmt5a2F2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI2NjM3MzEsImV4cCI6MjA1ODIzOTczMX0.r5B4VrR4kHOIcJ-FFlqhvUg0P3pi2i9HDAZ9U1xpqp0'

export const supabase = createClient(supabaseUrl, supabaseKey)

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