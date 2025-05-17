import * as z from 'zod';

export const registerSchema = z.object({
  name: z.string().nonempty('Name is required'),
  mobileNumber: z.string().regex(/^01[3-9]\d{8}$/, 'Invalid mobile number format'),
  email: z.string().email('Invalid email format'),
  pin: z.string().length(5, 'PIN must be exactly 5 digits'),
  nid: z.string().regex(/^\d{10}$/, 'NID must be 10 digits'),
  role: z.enum(['User', 'Agent'], 'Invalid role'),
});