import { z } from 'zod';
export const kCreateUserSchema = z.object({
  name: z
    .string({ required_error: 'name field is required' })
    .min(3, { message: 'Min length for name is 3' })
    .max(256, { message: 'Maxium length for name execeed' }),
  email: z
    .string({ required_error: 'email field is required' })
    .email({})
    .trim()
    .toLowerCase(),
  password: z
    .string({ required_error: 'password field is required' })
    .min(8)
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
      message: 'Week password',
    }),
});

export type ICreateUserDto = z.infer<typeof kCreateUserSchema>;
