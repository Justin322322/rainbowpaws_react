import * as z from 'zod'

const MAX_FILE_SIZE = 5000000 // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']

const fileSchema = z.any()
  .refine((file) => !file || (file instanceof File && file.size <= MAX_FILE_SIZE), 'Max file size is 5MB')
  .refine(
    (file) => !file || (file instanceof File && ACCEPTED_FILE_TYPES.includes(file.type)),
    'Only .jpg, .jpeg, .png and .pdf files are accepted'
  )

const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter (A-Z)')
  .regex(/[a-z]/, 'Password must include at least one lowercase letter (a-z)')
  .regex(/[0-9]/, 'Password must include at least one number (0-9)')
  .regex(/[^A-Za-z0-9]/, 'Password must include at least one special character (!@#$%^&*)')

const baseSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: passwordSchema,
  confirmPassword: z.string(),
  privacyPolicy: z.literal(true, {
    errorMap: () => ({ message: 'You must accept the privacy policy to continue' }),
  })
})

const serviceProviderSchema = baseSchema.extend({
  role: z.literal('serviceProvider'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  businessAddress: z.string().min(10, 'Please provide a complete business address'),
  businessPhone: z.string().min(10, 'Please provide a valid phone number'),
  businessEmail: z.string().email('Please enter a valid business email address'),
  businessDescription: z.string().min(50, 'Please provide a detailed description of your business (minimum 50 characters)'),
  birCertificate: z.instanceof(File).array().min(1, 'Please upload your BIR Certificate'),
  businessPermit: z.instanceof(File).array().min(1, 'Please upload your Business Permit'),
  governmentId: z.instanceof(File).array().min(1, 'Please upload your Government ID')
})

const furParentSchema = baseSchema.extend({
  role: z.literal('furParent')
})

export const signupSchema = z.discriminatedUnion('role', [
  serviceProviderSchema,
  furParentSchema
]).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type SignupForm = z.infer<typeof signupSchema>

export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required')
})

export type LoginForm = z.infer<typeof loginSchema>