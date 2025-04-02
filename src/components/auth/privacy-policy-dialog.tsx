import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog"
import { Button } from "../ui/button"

interface PrivacyPolicyDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAccept: () => void
}

export function PrivacyPolicyDialog({ open, onOpenChange, onAccept }: PrivacyPolicyDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-playfair">Privacy Policy for PawRest</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This Privacy Policy is in accordance with Republic Act No. 10173, also known as the Data Privacy Act of 2012 (DPA).
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4 text-sm">
          <section>
            <h3 className="font-semibold mb-2">1. Collection of Personal Information</h3>
            <p>We collect and process your personal information in accordance with the Data Privacy Act of 2012. This includes:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Basic personal information (name, contact details)</li>
              <li>Government-issued IDs and business permits (for service providers)</li>
              <li>Account credentials</li>
              <li>Service transaction history</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">2. Purpose of Data Collection</h3>
            <p>Your personal information is collected and processed for:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Account creation and management</li>
              <li>Service provider verification</li>
              <li>Facilitating pet cremation services</li>
              <li>Communication regarding our services</li>
              <li>Legal compliance and business operations</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">3. Your Rights Under the DPA</h3>
            <p>You have the following rights regarding your personal information:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Right to be informed</li>
              <li>Right to access</li>
              <li>Right to object</li>
              <li>Right to erasure or blocking</li>
              <li>Right to damages</li>
              <li>Right to file a complaint</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">4. Data Protection Measures</h3>
            <p>We implement reasonable and appropriate organizational, physical, and technical security measures to protect your personal information.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">5. Data Sharing and Disclosure</h3>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Verified pet cremation service providers</li>
              <li>Legal authorities when required by law</li>
              <li>Third-party service providers under strict confidentiality agreements</li>
            </ul>
          </section>

          <section>
            <h3 className="font-semibold mb-2">6. Data Retention</h3>
            <p>We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, or as required by law.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">7. Updates to Privacy Policy</h3>
            <p>We may update this Privacy Policy periodically. Significant changes will be notified to you through our platform.</p>
          </section>

          <section>
            <h3 className="font-semibold mb-2">8. Contact Information</h3>
            <p>For privacy concerns or to exercise your rights under the DPA, contact our Data Protection Officer at pawrest@gmail.com.</p>
          </section>
        </div>
        
        <div className="flex justify-end mt-6">
          <Button onClick={onAccept}>Accept and Continue</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}