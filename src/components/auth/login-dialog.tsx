import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginForm } from '@/lib/validations/auth'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isResetPassword, setIsResetPassword] = useState(false)
  const [resetSuccess, setResetSuccess] = useState(false)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleResetPassword = async () => {
    try {
      setIsLoading(true)
      setAuthError(null)
      setResetSuccess(false)

      const email = getValues('email')
      if (!email) {
        setAuthError('Please enter your email address')
        return
      }

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setResetSuccess(true)
    } catch (error) {
      console.error('Password reset error:', error)
      setAuthError(error instanceof Error ? error.message : 'Failed to send password reset email')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      setAuthError(null)
      
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (error) throw error
      if (!authData?.user) throw new Error('Failed to sign in')

      // Fetch user profile to get role
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single()

      reset()
      setIsOpen(false)
      
      // Redirect based on user role
      if (profile?.role) {
        router.push(`/dashboard/${profile.role.toLowerCase()}`)
      } else {
        router.push('/dashboard/fur-parent') // Default route
      }
    } catch (error) {
      console.error('Login error:', error)
      setAuthError(error instanceof Error ? error.message : 'Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild id="login-trigger">
          <Button variant="outline">Login</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-8 max-h-[85vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="space-y-4 mb-8">
            <DialogTitle className="text-3xl font-playfair text-center text-foreground">
              {isResetPassword ? 'Reset Password' : 'Welcome Back'}
            </DialogTitle>
            <DialogDescription className="text-center text-base text-muted-foreground">
              {isResetPassword 
                ? 'Enter your email address and we will send you a password reset link.'
                : 'Please enter your credentials to continue.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {authError && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
                {authError}
              </div>
            )}

            {resetSuccess && (
              <div className="p-4 bg-green-100 border border-green-200 rounded-lg text-green-600 text-sm">
                Password reset link has been sent to your email address.
              </div>
            )}
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
                <input
                  {...register('email')}
                  type="email"
                  id="email"
                  className="w-full px-4 py-2.5 bg-background border-2 border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  placeholder="Enter your email"
                  disabled={isLoading}
                />
                {errors.email && (
                  <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                )}
              </div>

              {!isResetPassword && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-foreground/80">Password</label>
                  <div className="relative">
                    <input
                      {...register('password')}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="w-full px-4 py-2.5 bg-background border-2 border-input rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
                      placeholder="Enter your password"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive mt-1">{errors.password.message}</p>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col space-y-4">
              <Button
                type={isResetPassword ? "button" : "submit"}
                onClick={isResetPassword ? handleResetPassword : undefined}
                className="w-full bg-primary hover:bg-primary/90 py-2.5 rounded-lg text-base"
                disabled={isLoading}
              >
                {isLoading 
                  ? (isResetPassword ? 'Sending...' : 'Signing in...') 
                  : (isResetPassword ? 'Send Reset Link' : 'Sign In')}
              </Button>

              <div className="flex flex-col space-y-2 text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 transition-colors font-medium"
                  onClick={() => {
                    setAuthError(null)
                    setResetSuccess(false)
                    setIsResetPassword(!isResetPassword)
                  }}
                  disabled={isLoading}
                >
                  {isResetPassword ? 'Back to Login' : 'Forgot Password?'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    document.getElementById('signup-trigger')?.click()
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  disabled={isLoading}
                >
                  Don't have an account? <span className="text-primary font-medium">Sign up</span>
                </button>
              </div>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}