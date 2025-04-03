import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog'
import { Button } from '../ui/button'

interface PrivacyPolicyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: () => void
}

export function PrivacyPolicyDialog({ open, onOpenChange, onAccept }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-6">
        <DialogHeader className="space-y-3 mb-6">
          <DialogTitle className="text-2xl font-playfair text-center text-foreground">Privacy Policy</DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Please read our privacy policy carefully before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 text-foreground/80">
          {/* Privacy policy content */}
          <p>
            At Rainbow Paws, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.
          </p>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Information We Collect</h3>
            <p>We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Business information (for service providers)</li>
              <li>Payment information</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">How We Use Your Information</h3>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and improve our services</li>
              <li>Process your transactions</li>
              <li>Communicate with you</li>
              <li>Ensure platform security</li>
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-medium text-foreground">Data Security</h3>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="hover:bg-accent/10"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onAccept()
              onOpenChange(false)
            }}
            className="bg-primary hover:bg-primary/90"
          >
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}