import { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import * as z from 'zod'
import { Button } from '../ui/button'

interface FurParentFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  privacyPolicy: boolean
}

const furParentSignupSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  privacyPolicy: z.boolean().refine(val => val === true, 'You must accept the privacy policy'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
})

interface FurParentSignupProps {
  onShowPrivacyPolicy: () => void
}

export function FurParentSignup({ onShowPrivacyPolicy }: FurParentSignupProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<FurParentFormData>({
    resolver: zodResolver(furParentSignupSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      privacyPolicy: false
    }
  })

  const handleFormSubmit: SubmitHandler<FurParentFormData> = async (formData) => {
    try {
      setIsLoading(true)
      setAuthError(null)
      setIsSuccess(false)

      // Sign up with Supabase
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            role: 'furParent'
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (signUpError) {
        console.error('Signup error:', signUpError)
        throw new Error(`Failed to create account: ${signUpError.message}`)
      }

      if (!authData?.user) {
        throw new Error('Failed to create account. Please try again.')
      }

      // Reset form
      reset()
      
      // Show success message
      setIsSuccess(true)
      setAuthError('Account created successfully! Please check your email to verify your account.')
    } catch (error) {
      console.error('Signup error:', error)
      setIsSuccess(false)
      setAuthError(error instanceof Error ? error.message : 'An error occurred during signup')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6 max-w-2xl mx-auto overflow-y-auto custom-scrollbar pr-2">
      {authError && (
        <div className={`p-3 border rounded-md text-sm ${
          isSuccess 
            ? 'bg-green-100 border-green-300 text-green-600' 
            : 'bg-red-100 border-red-300 text-red-600'
        }`}>
          {authError}
        </div>
      )}
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-foreground/80">First Name</label>
          <input
            {...register('firstName')}
            type="text"
            id="firstName"
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
            placeholder="Enter your first name"
            disabled={isLoading}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-foreground/80">Last Name</label>
          <input
            {...register('lastName')}
            type="text"
            id="lastName"
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
            placeholder="Enter your last name"
            disabled={isLoading}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground/80">Email</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
          placeholder="Enter your email"
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground/80">Password</label>
        <div className="relative">
          <input
            {...register('password')}
            type={showPassword ? "text" : "password"}
            id="password"
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
            placeholder="Create a password"
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
          <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium text-foreground/80">Confirm Password</label>
        <div className="relative">
          <input
            {...register('confirmPassword')}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
            placeholder="Confirm your password"
            disabled={isLoading}
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            disabled={isLoading}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('privacyPolicy')}
          id="privacyPolicy"
          className="w-4 h-4 text-primary border-input rounded focus:ring-primary"
          disabled={isLoading}
        />
        <label htmlFor="privacyPolicy" className="text-sm text-foreground/80">
          I agree to the{' '}
          <button
            type="button"
            className="text-primary hover:text-primary/80 transition-colors"
            onClick={onShowPrivacyPolicy}
            disabled={isLoading}
          >
            Privacy Policy
          </button>
        </label>
      </div>
      {errors.privacyPolicy && (
        <p className="text-sm text-red-500 mt-1">{errors.privacyPolicy.message}</p>
      )}

      <Button 
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-base"
        disabled={isLoading}
      >
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  )
}