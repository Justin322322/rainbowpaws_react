import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, UserRound, Building, ArrowLeft } from 'lucide-react'
import { SignupForm, signupSchema } from '@/lib/validations/auth'
import { PrivacyPolicyDialog } from './privacy-policy-dialog'

export function SignupDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<'furParent' | 'serviceProvider' | undefined>(undefined)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  
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

  const handleUserTypeSelect = (type: 'furParent' | 'serviceProvider') => {
    setSelectedUserType(type)
    setValue('userType', type)
    setShowUserTypeDialog(false)
    setIsOpen(true)
  }

  const handlePrivacyPolicyAccept = () => {
    setValue('privacyPolicy', true)
    setShowPrivacyPolicy(false)
  }

  const handleGoBack = () => {
    setSelectedUserType(undefined)
    setIsOpen(false)
    setShowUserTypeDialog(true)
  }

  const nextStep = () => setCurrentStep(prev => prev + 1)
  const prevStep = () => setCurrentStep(prev => prev - 1)

  // Helper function to safely access errors for service provider fields
  const getFieldError = (fieldName: string) => {
    if (!selectedUserType || selectedUserType !== 'serviceProvider') return undefined;
    return (errors as any)?.[fieldName]?.message;
  };

  const renderServiceProviderStep = () => {
    switch(currentStep) {
      case 1:
        return (
          <>
            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium text-foreground/80">Business Name</label>
              <input
                {...register('businessName')}
                type="text"
                id="businessName"
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="Enter your business name"
              />
              {getFieldError('businessName') && (
                <p className="text-sm text-red-500 mt-1">{getFieldError('businessName')}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="businessAddress" className="text-sm font-medium text-foreground/80">Business Address</label>
              <input
                {...register('businessAddress')}
                type="text"
                id="businessAddress"
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                placeholder="Enter your business address"
              />
              {getFieldError('businessAddress') && (
                <p className="text-sm text-red-500 mt-1">{getFieldError('businessAddress')}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="businessPhone" className="text-sm font-medium text-foreground/80">Business Phone</label>
                <input
                  {...register('businessPhone')}
                  type="tel"
                  id="businessPhone"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  placeholder="Enter business phone"
                />
                {getFieldError('businessPhone') && (
                  <p className="text-sm text-red-500 mt-1">{getFieldError('businessPhone')}</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="businessEmail" className="text-sm font-medium text-foreground/80">Business Email</label>
                <input
                  {...register('businessEmail')}
                  type="email"
                  id="businessEmail"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  placeholder="Enter business email"
                />
                {getFieldError('businessEmail') && (
                  <p className="text-sm text-red-500 mt-1">{getFieldError('businessEmail')}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="businessDescription" className="text-sm font-medium text-foreground/80">Business Description</label>
              <textarea
                {...register('businessDescription')}
                id="businessDescription"
                rows={4}
                className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors resize-none"
                placeholder="Describe your business and services"
              />
              {getFieldError('businessDescription') && (
                <p className="text-sm text-red-500 mt-1">{getFieldError('businessDescription')}</p>
              )}
            </div>
          </>
        )
      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-foreground/80">Required Documents</h3>
            
            <div className="space-y-2">
              <label htmlFor="birCertificate" className="text-sm font-medium text-foreground/80">BIR Certificate</label>
              <input
                {...register('birCertificate')}
                type="file"
                id="birCertificate"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-input file:bg-background file:hover:bg-accent/5 file:text-foreground/80 hover:file:text-foreground file:transition-colors"
              />
              {getFieldError('birCertificate') && (
                <p className="text-sm text-red-500 mt-1">{getFieldError('birCertificate')}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="businessPermit" className="text-sm font-medium text-foreground/80">Business Permit</label>
              <input
                {...register('businessPermit')}
                type="file"
                id="businessPermit"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-input file:bg-background file:hover:bg-accent/5 file:text-foreground/80 hover:file:text-foreground file:transition-colors"
              />
              {getFieldError('businessPermit') && (
                <p className="text-sm text-red-500 mt-1">{getFieldError('businessPermit')}</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="governmentId" className="text-sm font-medium text-foreground/80">Government ID</label>
              <input
                {...register('governmentId')}
                type="file"
                id="governmentId"
                accept=".pdf,.jpg,.jpeg,.png"
                className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-input file:bg-background file:hover:bg-accent/5 file:text-foreground/80 hover:file:text-foreground file:transition-colors"
              />
              {getFieldError('governmentId') && (
                <p className="text-sm text-red-500 mt-1">{getFieldError('governmentId')}</p>
              )}
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <>
      <Dialog open={showUserTypeDialog} onOpenChange={setShowUserTypeDialog}>
        <DialogTrigger asChild id="signup-trigger">
          <Button variant="default" onClick={() => setShowUserTypeDialog(true)}>Join Us</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] p-8">
          <DialogHeader className="space-y-3 mb-6">
            <DialogTitle className="text-2xl font-playfair text-center text-foreground">Choose Your Role</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-4">
            <button
              className="flex items-center space-x-4 p-6 border rounded-lg hover:bg-accent/50 transition-colors text-left"
              onClick={() => handleUserTypeSelect('furParent')}
            >
              <UserRound size={24} className="text-primary" />
              <div>
                <h3 className="font-semibold mb-1 text-foreground">Fur Parent</h3>
                <p className="text-sm text-muted-foreground">Looking for pet care services for your beloved companions</p>
              </div>
            </button>
            <button
              className="flex items-center space-x-4 p-6 border rounded-lg hover:bg-accent/50 transition-colors text-left"
              onClick={() => handleUserTypeSelect('serviceProvider')}
            >
              <Building size={24} className="text-primary" />
              <div>
                <h3 className="font-semibold mb-1 text-foreground">Service Provider</h3>
                <p className="text-sm text-muted-foreground">Offering professional pet care services to fur parents</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-6">
          <DialogHeader className="space-y-3 mb-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-2 top-2 hover:bg-accent/10"
              onClick={handleGoBack}
            >
              <ArrowLeft size={18} />
            </Button>
            <DialogTitle className="text-2xl font-playfair text-center text-foreground">Create Account</DialogTitle>
            <DialogDescription className="text-center text-muted-foreground">
              {selectedUserType === 'furParent' 
                ? 'Join us as a pet parent and find trusted cremation services.' 
                : 'Register as a service provider to offer your cremation services.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="firstName" className="text-sm font-medium text-foreground/80">First Name</label>
                <input
                  {...register('firstName')}
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors"
                  placeholder="Enter your first name"
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
              />
              {errors.email && (
                <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            {selectedUserType === 'serviceProvider' && renderServiceProviderStep()}

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground/80">Password</label>
              <div className="relative">
                <input
                  {...register('password')}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full px-4 py-2 bg-background border border-input rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-colors pr-10"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
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
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
              />
              <label htmlFor="privacyPolicy" className="text-sm text-foreground/80">
                I agree to the{' '}
                <button
                  type="button"
                  className="text-primary hover:text-primary/80 transition-colors"
                  onClick={() => setShowPrivacyPolicy(true)}
                >
                  Privacy Policy
                </button>
              </label>
            </div>
            {errors.privacyPolicy && (
              <p className="text-sm text-red-500 mt-1">{errors.privacyPolicy.message}</p>
            )}

            <div className="flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false)
                  document.getElementById('login-trigger')?.click()
                }}
                className="text-sm text-primary hover:text-primary/80 transition-colors"
              >
                Already have an account? Sign in
              </button>
            </div>

            <div className="flex justify-between space-x-4 pt-4">
              <Button 
                type="button" 
                variant="ghost" 
                onClick={() => {
                  if (selectedUserType === 'serviceProvider' && currentStep > 1) {
                    prevStep()
                  } else {
                    setIsOpen(false)
                    setSelectedUserType(undefined)
                    reset()
                  }
                }}
                className="hover:bg-accent/10 min-w-[100px] text-base"
              >
                {selectedUserType === 'serviceProvider' && currentStep > 1 ? 'Back' : 'Cancel'}
              </Button>
              {selectedUserType === 'serviceProvider' ? (
                currentStep === 1 ? (
                  <Button 
                    type="button"
                    onClick={nextStep}
                    className="bg-primary hover:bg-primary/90 min-w-[100px] text-base"
                  >
                    Next
                  </Button>
                ) : (
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary/90 min-w-[100px] text-base"
                  >
                    Sign Up
                  </Button>
                )
              ) : (
                <Button 
                  type="submit"
                  className="bg-primary hover:bg-primary/90 min-w-[100px] text-base"
                >
                  Sign Up
                </Button>
              )}
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