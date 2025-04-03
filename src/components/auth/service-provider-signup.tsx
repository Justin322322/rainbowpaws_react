import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { Eye, EyeOff } from 'lucide-react';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_FILE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];

const serviceProviderSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Invalid email address'),
  sex: z.enum(['male', 'female', 'other'], {
    required_error: 'Please select your sex',
  }),
  businessName: z.string().min(2, 'Business name is required'),
  businessAddress: z.string().min(5, 'Business address is required'),
  businessPhone: z.string().min(10, 'Valid phone number is required'),
  businessEmail: z.string().email('Invalid business email address'),
  businessDescription: z.string().min(20, 'Please provide a detailed business description'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  privacyPolicy: z.boolean().refine((val) => val === true, {
    message: 'You must agree to the Privacy Policy',
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ServiceProviderFormData = z.infer<typeof serviceProviderSchema>;

export function ServiceProviderSignup() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [birCertificate, setBirCertificate] = useState<File | null>(null);
  const [businessPermit, setBusinessPermit] = useState<File | null>(null);
  const [governmentId, setGovernmentId] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceProviderFormData>({
    resolver: zodResolver(serviceProviderSchema),
  });

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      return 'File size should be less than 5MB';
    }
    if (!ACCEPTED_FILE_TYPES.includes(file.type)) {
      return 'File type not accepted. Please upload JPG, PNG, or PDF';
    }
    return null;
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFile: (file: File | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const error = validateFile(file);
      if (error) {
        alert(error);
        return;
      }
      setFile(file);
    }
  };

  const onSubmit = async (data: ServiceProviderFormData) => {
    try {
      setIsLoading(true);

      if (!birCertificate || !businessPermit || !governmentId) {
        alert('Please upload all required documents');
        return;
      }

      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            first_name: data.firstName,
            last_name: data.lastName,
            sex: data.sex,
            role: 'service_provider',
          },
        },
      });

      if (authError) throw authError;

      // 2. Upload documents to storage
      const userId = authData.user?.id;
      if (!userId) throw new Error('User ID not found');

      const uploadFile = async (file: File, path: string) => {
        const { error } = await supabase.storage
          .from('business_documents')
          .upload(`${userId}/${path}`, file);
        if (error) throw error;
      };

      await Promise.all([
        uploadFile(birCertificate, 'bir_certificate'),
        uploadFile(businessPermit, 'business_permit'),
        uploadFile(governmentId, 'government_id'),
      ]);

      // 3. Create business profile
      const { error: profileError } = await supabase
        .from('businesses')
        .insert({
          user_id: userId,
          name: data.businessName,
          address: data.businessAddress,
          phone: data.businessPhone,
          email: data.businessEmail,
          description: data.businessDescription,
        });

      if (profileError) throw profileError;

      alert('Registration successful! Please check your email to verify your account.');
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto overflow-y-auto custom-scrollbar pr-2">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            {...register('firstName')}
            placeholder="Enter your first name"
            error={errors.firstName?.message}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            {...register('lastName')}
            placeholder="Enter your last name"
            error={errors.lastName?.message}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="Enter your email"
          error={errors.email?.message}
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="sex">Sex</Label>
        <Select onValueChange={(value: string) => setValue('sex', value as 'male' | 'female' | 'other')}>
          <SelectTrigger>
            <SelectValue placeholder="Select Sex" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.sex && (
          <p className="text-sm text-red-500">{errors.sex.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessName">Business Name</Label>
        <Input
          id="businessName"
          {...register('businessName')}
          placeholder="Enter your business name"
          error={errors.businessName?.message}
        />
        {errors.businessName && (
          <p className="text-sm text-red-500">{errors.businessName.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessAddress">Business Address</Label>
        <Input
          id="businessAddress"
          {...register('businessAddress')}
          placeholder="Enter your business address"
          error={errors.businessAddress?.message}
        />
        {errors.businessAddress && (
          <p className="text-sm text-red-500">{errors.businessAddress.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessPhone">Business Phone</Label>
        <Input
          id="businessPhone"
          {...register('businessPhone')}
          placeholder="Enter your business phone"
          error={errors.businessPhone?.message}
        />
        {errors.businessPhone && (
          <p className="text-sm text-red-500">{errors.businessPhone.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessEmail">Business Email</Label>
        <Input
          id="businessEmail"
          type="email"
          {...register('businessEmail')}
          placeholder="Enter your business email"
          error={errors.businessEmail?.message}
        />
        {errors.businessEmail && (
          <p className="text-sm text-red-500">{errors.businessEmail.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="businessDescription">Business Description</Label>
        <Textarea
          id="businessDescription"
          {...register('businessDescription')}
          placeholder="Enter your business description"
          error={errors.businessDescription?.message}
        />
        {errors.businessDescription && (
          <p className="text-sm text-red-500">{errors.businessDescription.message}</p>
        )}
      </div>

      <div className="space-y-6">
        <h3 className="font-semibold text-xl text-primary font-playfair">Required Documents</h3>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="birCertificate">BIR Certificate</Label>
            <div className="relative">
              <input
                id="birCertificate"
                type="file"
                onChange={(e) => handleFileChange(e, setBirCertificate)}
                accept={ACCEPTED_FILE_TYPES.join(',')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-md bg-background/50 hover:bg-primary/5 transition-colors">
                <span className="text-sm text-muted-foreground">
                  {birCertificate ? birCertificate.name : 'Choose file...'}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="ml-auto pointer-events-none"
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessPermit">Business Permit</Label>
            <div className="relative">
              <input
                id="businessPermit"
                type="file"
                onChange={(e) => handleFileChange(e, setBusinessPermit)}
                accept={ACCEPTED_FILE_TYPES.join(',')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-md bg-background/50 hover:bg-primary/5 transition-colors">
                <span className="text-sm text-muted-foreground">
                  {businessPermit ? businessPermit.name : 'Choose file...'}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="ml-auto pointer-events-none"
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="governmentId">Government ID</Label>
            <div className="relative">
              <input
                id="governmentId"
                type="file"
                onChange={(e) => handleFileChange(e, setGovernmentId)}
                accept={ACCEPTED_FILE_TYPES.join(',')}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-primary/20 hover:border-primary/40 rounded-md bg-background/50 hover:bg-primary/5 transition-colors">
                <span className="text-sm text-muted-foreground">
                  {governmentId ? governmentId.name : 'Choose file...'}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="ml-auto pointer-events-none"
                >
                  Browse
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            {...register('password')}
            placeholder="Create a password"
            error={errors.password?.message}
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
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            {...register('confirmPassword')}
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
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
          <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register('privacyPolicy')}
          id="privacyPolicy"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
        />
        <Label htmlFor="privacyPolicy" className="text-sm">
          I agree to the Privacy Policy
        </Label>
      </div>
      {errors.privacyPolicy && (
        <p className="text-sm text-red-500">{errors.privacyPolicy.message}</p>
      )}

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? 'Signing up...' : 'Sign Up'}
      </Button>
    </form>
  );
}