import { email, z } from "zod";
export const loginValidationSchema = z.object({
	email: email(),
	password: z.string().min(3, "Пароль має бути не менше 6 символів"),
});
