import { z } from "zod";

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email format"),
  password: z.string().trim().min(5, "Password must be at least 6 characters long"),
});

export default loginSchema;