import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Ім’я має бути не менше 3 символів'),
  email: z.email({ message: 'Невірний формат email' }),
  password: z.string().min(3, 'Пароль має бути не менше 6 символів'),
  name: z.string().min(2, 'Ім’я має бути не менше 2 символів'),
});
