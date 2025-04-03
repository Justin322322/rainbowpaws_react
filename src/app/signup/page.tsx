import { ServiceProviderSignup } from "@/components/auth/service-provider-signup"

export default function SignupPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Sign Up as a Service Provider</h1>
        <ServiceProviderSignup />
      </div>
    </div>
  )
} 