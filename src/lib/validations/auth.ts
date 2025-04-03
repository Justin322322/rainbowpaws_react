import * as z from 'zod'

const furParentSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  userType: z.literal('furParent'),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy to continue',
  }),
})

const serviceProviderSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessAddress: z.string().min(5, 'Business address must be at least 5 characters'),
  businessPhone: z.string().min(8, 'Please enter a valid phone number'),
  businessEmail: z.string().email('Please enter a valid business email address'),
  businessDescription: z.string().min(20, 'Please provide a detailed business description (minimum 20 characters)'),
  birCertificate: z.any().optional(),
  businessPermit: z.any().optional(),
  governmentId: z.any().optional(),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  confirmPassword: z.string(),
  userType: z.literal('serviceProvider'),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy policy to continue',
  }),
})

export const signupSchema = z.discriminatedUnion('userType', [
  furParentSchema,
  serviceProviderSchema
])
// Refine the schema to check password confirmation
.refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type SignupForm = z.infer<typeof signupSchema>