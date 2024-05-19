import { z } from 'zod';

export const kAuthLoginSchema = z
  .object({
    email: z
      .string({ required_error: 'email field is required' })
      .email({})
      .trim()
      .toLowerCase(),
    password: z.string({ required_error: 'password field is required' }).min(8),
  })
  .strict();
export type IAuthLoginDto = z.infer<typeof kAuthLoginSchema>;
