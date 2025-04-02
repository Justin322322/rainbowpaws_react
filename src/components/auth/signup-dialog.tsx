import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, UserRound, Building } from 'lucide-react'
import { SignupForm, signupSchema } from '@/lib/validations/auth'
import { PrivacyPolicyDialog } from './privacy-policy-dialog'

export function SignupDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<'furParent' | 'serviceProvider' | undefined>(undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  
  const { register, handleSubmit, watch, formState: { errors }, setValue, reset } = useForm<SignupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      userType: undefined,
      privacyPolicy: false
    }
  })

  const onSubmit = async (data: SignupForm) => {
    // Handle signup logic here
    console.log(data)
    setIsOpen(false)
    setShowUserTypeDialog(false)
    setSelectedUserType(undefined)
    reset()
  }

  // Update form when user type changes
  useEffect(() => {
    if (selectedUserType) {
      setValue('userType', selectedUserType)
    }
  }, [selectedUserType, setValue])

  const handlePrivacyPolicyAccept = () => {
    setValue('privacyPolicy', true)
    setShowPrivacyPolicy(false)
  }

  // Helper function to safely access errors for service provider fields
  const getFieldError = (fieldName: string) => {
    return selectedUserType === 'serviceProvider' ? (errors as any)?.[fieldName]?.message : undefined
  }

  return (
    <>
      <Dialog open={showUserTypeDialog} onOpenChange={setShowUserTypeDialog}>
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setShowUserTypeDialog(true)}>Join Us</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] p-6">
          <DialogHeader className="space-y-2 mb-6">
            <DialogTitle className="text-2xl font-playfair text-center">Choose Your Role</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Select how you would like to join Rainbow Paws
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            <button
              className="flex items-center space-x-4 p-6 border rounded-lg hover:bg-accent/50 transition-colors text-left"
              onClick={() => {
                setSelectedUserType('furParent')
                setShowUserTypeDialog(false)
                setIsOpen(true)
              }}
            >
              <UserRound size={24} className="text-primary" />
              <div>
                <h3 className="font-semibold mb-1">Fur Parent</h3>
                <p className="text-sm text-muted-foreground">Looking for pet care services for your beloved companions</p>
              </div>
            </button>
            <button
              className="flex items-center space-x-4 p-6 border rounded-lg hover:bg-accent/50 transition-colors text-left"
              onClick={() => {
                setSelectedUserType('serviceProvider')
                setShowUserTypeDialog(false)
                setIsOpen(true)
              }}
            >
              <Building size={24} className="text-primary" />
              <div>
                <h3 className="font-semibold mb-1">Service Provider</h3>
                <p className="text-sm text-muted-foreground">Offering professional pet care services to fur parents</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto p-6">
          <DialogHeader className="space-y-2 mb-4">
            <DialogTitle className="text-2xl font-playfair text-center">Join Rainbow Paws</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              Create your account to become part of our community.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium block">First Name</label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  placeholder="Enter your first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 mt-1">{errors.firstName.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="lastName" className="text-sm font-medium block">Last Name</label>
                <input
                  {...register('lastName')}
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  placeholder="Enter your last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 mt-1">{errors.lastName.message}</p>
                )}
              </div>
            </div>

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

            {selectedUserType === 'serviceProvider' && (
              <>
                <div className="space-y-2">
                  <label htmlFor="sex" className="text-sm font-medium block">Sex</label>
                  <select
                    {...register('sex')}
                    id="sex"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  >
                    <option value="">Select Sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {getFieldError('sex') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('sex')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessName" className="text-sm font-medium block">Business Name</label>
                  <input
                    {...register('businessName')}
                    type="text"
                    id="businessName"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter your business name"
                  />
                  {getFieldError('businessName') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('businessName')}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessAddress" className="text-sm font-medium block">Business Address</label>
                  <input
                    {...register('businessAddress')}
                    type="text"
                    id="businessAddress"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                    placeholder="Enter your business address"
                  />
                  {getFieldError('businessAddress') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('businessAddress')}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="businessPhone" className="text-sm font-medium block">Business Phone</label>
                    <input
                      {...register('businessPhone')}
                      type="tel"
                      id="businessPhone"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      placeholder="Enter business phone"
                    />
                    {getFieldError('businessPhone') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError('businessPhone')}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="businessEmail" className="text-sm font-medium block">Business Email</label>
                    <input
                      {...register('businessEmail')}
                      type="email"
                      id="businessEmail"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                      placeholder="Enter business email"
                    />
                    {getFieldError('businessEmail') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError('businessEmail')}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="businessDescription" className="text-sm font-medium block">Business Description</label>
                  <textarea
                    {...register('businessDescription')}
                    id="businessDescription"
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
                    placeholder="Describe your business and services"
                  />
                  {getFieldError('businessDescription') && (
                    <p className="text-sm text-red-500 mt-1">{getFieldError('businessDescription')}</p>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium">Required Documents</h3>
                  
                  <div className="space-y-2">
                    <label htmlFor="birCertificate" className="text-sm font-medium block">BIR Certificate</label>
                    <input
                      {...register('birCertificate')}
                      type="file"
                      id="birCertificate"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {getFieldError('birCertificate') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError('birCertificate')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="businessPermit" className="text-sm font-medium block">Business Permit</label>
                    <input
                      {...register('businessPermit')}
                      type="file"
                      id="businessPermit"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {getFieldError('businessPermit') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError('businessPermit')}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="governmentId" className="text-sm font-medium block">Government ID</label>
                    <input
                      {...register('governmentId')}
                      type="file"
                      id="governmentId"
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                    />
                    {getFieldError('governmentId') && (
                      <p className="text-sm text-red-500 mt-1">{getFieldError('governmentId')}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium block">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
                  placeholder="Create a password"
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

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium block">Confirm Password</label>
              <div className="relative">
                <input
                  {...register('confirmPassword')}
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('privacyPolicy')}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                />
                <span className="text-sm">
                  I agree to the {' '}
                  <button
                    type="button"
                    className="text-primary hover:underline"
                    onClick={() => setShowPrivacyPolicy(true)}
                  >
                    Privacy Policy
                  </button>
                </span>
              </label>
              {errors.privacyPolicy && (
                <p className="text-sm text-red-500">{errors.privacyPolicy.message}</p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  // Trigger login dialog
                  document.getElementById('login-trigger')?.click()
                }}
                className="text-sm text-primary hover:underline"
              >
                Already have an account? Sign in
              </button>
            </div>

            <div className="flex justify-end space-x-4 pt-2">
              <Button 
                variant="ghost" 
                type="button" 
                onClick={() => {
                  setIsOpen(false)
                  setSelectedUserType(undefined)
                  reset()
                }} 
                className="min-w-[100px]"
              >
                Cancel
              </Button>
              <Button type="submit" className="min-w-[100px]">Sign Up</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <PrivacyPolicyDialog
        open={showPrivacyPolicy}
        onOpenChange={setShowPrivacyPolicy}
        onAccept={handlePrivacyPolicyAccept}
      />
    </>
  )
}