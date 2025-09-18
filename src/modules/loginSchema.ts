import { z } from 'zod';

export const loginSchema = z.object({
  username: z.string().min(3, 'Ім’я має бути не менше 3 символів'),
  password: z.string().min(6, 'Пароль має бути не менше 6 символів'),
});