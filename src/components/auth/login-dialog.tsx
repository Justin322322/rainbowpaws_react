"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
})

type LoginForm = z.infer<typeof loginSchema>

export function LoginDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema)
  })

  const onSubmit = async (data: LoginForm) => {
    // Handle login logic here
    console.log(data)
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild id="login-trigger">
        <Button variant="outline">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-6">
        <DialogHeader className="space-y-2 mb-4">
          <DialogTitle className="text-2xl font-playfair text-center">Login to Rainbow Paws</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Welcome back! Please enter your credentials to continue.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium block">Email</label>
              <input
                {...register('email')}
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium block">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <button
              type="button"
              onClick={() => {
                // Handle forgot password
                console.log('Forgot password clicked')
              }}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false)
                // Trigger sign up dialog
                document.getElementById('signup-trigger')?.click()
              }}
              className="text-sm text-primary hover:underline"
            >
              Don't have an account? Sign up
            </button>
          </div>
          <div className="flex justify-end space-x-4 pt-2">
            <Button variant="ghost" type="button" onClick={() => setIsOpen(false)} className="min-w-[100px]">
              Cancel
            </Button>
            <Button type="submit" className="min-w-[100px]">Login</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}