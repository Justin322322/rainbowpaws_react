'use client';

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../ui/dialog'
import { Button } from '../ui/button'
import { UserRound, Building, ArrowLeft } from 'lucide-react'
import { PrivacyPolicyDialog } from './privacy-policy-dialog'
import { FurParentSignup } from './fur-parent-signup'
import { ServiceProviderSignup } from './service-provider-signup'

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
        <DialogTrigger asChild>
          <Button variant="default" onClick={() => setShowUserTypeDialog(true)}>Join Us</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[550px] p-8 custom-scrollbar">
          <DialogHeader className="space-y-4 mb-8">
            <DialogTitle className="text-3xl font-playfair text-center text-foreground">Choose Your Role</DialogTitle>
            <DialogDescription className="text-center text-base text-muted-foreground">
              Select how you would like to join our community
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 gap-6">
            <button
              className="group flex items-center space-x-6 p-6 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
              onClick={() => handleUserTypeSelect('furParent')}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <UserRound size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">Fur Parent</h3>
                <p className="text-sm text-muted-foreground">Looking for pet care services for your beloved companions</p>
              </div>
            </button>
            <button
              className="group flex items-center space-x-6 p-6 border-2 rounded-xl hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left"
              onClick={() => handleUserTypeSelect('serviceProvider')}
            >
              <div className="p-3 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <Building size={28} />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-foreground group-hover:text-primary transition-colors">Service Provider</h3>
                <p className="text-sm text-muted-foreground">Offering professional pet care services to fur parents</p>
              </div>
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto px-8 py-6 custom-scrollbar">
          <DialogHeader className="space-y-6 mb-8">
            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-4 hover:bg-accent/10 rounded-full p-2 h-auto text-muted-foreground hover:text-primary"
              onClick={handleGoBack}
            >
              <ArrowLeft size={18} />
            </Button>
            <div className="space-y-2 pt-4">
              <DialogTitle className="text-3xl font-playfair font-semibold text-center text-primary">
                Create Account
              </DialogTitle>
              <DialogDescription className="text-center text-base text-muted-foreground max-w-md mx-auto">
                {selectedUserType === 'furParent' 
                  ? 'Join us as a pet parent and find trusted pet care services.' 
                  : 'Register as a service provider to offer your pet care services.'}
              </DialogDescription>
              <div className="w-24 h-0.5 bg-accent/30 mx-auto mt-6"></div>
            </div>
          </DialogHeader>
          
          <div className="px-4">
            {selectedUserType === 'furParent' ? (
              <FurParentSignup onShowPrivacyPolicy={() => setShowPrivacyPolicy(true)} />
            ) : (
              <ServiceProviderSignup />
            )}
          </div>
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