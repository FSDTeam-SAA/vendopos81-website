import { z } from "zod";

export const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(1),
  message: z.string().min(10, "Message must be at least 10 characters"),
  privacyAgreed: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type FormErrors = Partial<Record<keyof ContactFormData, string>>;
