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
      <DialogContent className="sm:max-w-[600px] max-h-[85vh] overflow-y-auto p-8 custom-scrollbar">
        <DialogHeader className="space-y-4 mb-8">
          <DialogTitle className="text-3xl font-playfair text-center text-foreground">Privacy Policy</DialogTitle>
          <DialogDescription className="text-center text-base text-muted-foreground">
            Please read our privacy policy carefully before proceeding.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 text-foreground/80">
          <p className="text-base leading-relaxed">
            At Rainbow Paws, we take your privacy seriously. This Privacy Policy describes how we collect, use, and protect your personal information.
          </p>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Information We Collect</h3>
            <p className="text-base leading-relaxed">We collect information that you provide directly to us, including:</p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Name and contact information</li>
              <li>Account credentials</li>
              <li>Business information (for service providers)</li>
              <li>Payment information</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">How We Use Your Information</h3>
            <p className="text-base leading-relaxed">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 text-base">
              <li>Provide and improve our services</li>
              <li>Process your transactions</li>
              <li>Communicate with you</li>
              <li>Ensure platform security</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground">Data Security</h3>
            <p className="text-base leading-relaxed">
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="px-6 py-2.5 text-base border-2"
          >
            Close
          </Button>
          <Button
            onClick={() => {
              onAccept()
              onOpenChange(false)
            }}
            className="px-6 py-2.5 text-base bg-primary hover:bg-primary/90"
          >
            Accept
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}