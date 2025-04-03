import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { UserRound, Building, ArrowLeft } from 'lucide-react'
import { PrivacyPolicyDialog } from './privacy-policy-dialog'
import { FurParentSignup } from './fur-parent-signup'

export function SignupDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [showUserTypeDialog, setShowUserTypeDialog] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<'furParent' | 'serviceProvider'>()
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false)

  const handleUserTypeSelect = (type: 'furParent' | 'serviceProvider') => {
    setSelectedUserType(type)
    setShowUserTypeDialog(false)
    setIsOpen(true)
  }

  const handlePrivacyPolicyAccept = () => {
    setShowPrivacyPolicy(false)
  }

  const handleGoBack = () => {
    setSelectedUserType(undefined)
    setIsOpen(false)
    setShowUserTypeDialog(true)
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
          
          {selectedUserType === 'furParent' ? (
            <FurParentSignup onShowPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
          ) : (
            // We'll create a separate ServiceProviderSignup component later
            <div>Service Provider signup form will be here</div>
          )}
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