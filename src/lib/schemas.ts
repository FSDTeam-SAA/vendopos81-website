import { z } from "zod"

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>


export const personalInformationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  // email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  location: z.string().optional(),
  image: z.any().optional(),
  street: z.string().optional(),
  postalCode: z.string().optional(),
  // gender: z.enum(["male", "female", "other"]),
})

export type PersonalInformationFormData = z.infer<typeof personalInformationSchema>

export const vendorRegistrationSchema = z.object({
  // Business Information
  shopName: z.string().min(2, "Shop name must be at least 2 characters"),
  brandName: z.string().min(2, "Brand name must be at least 2 characters"),
  description: z.string().min(10, "Business description must be at least 10 characters"),
  logo: z.any().optional(),
  
  // Contact Information
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  
  // Warehouse Location
  warehouseLocation: z.string().min(2, "Warehouse location must be at least 2 characters"),
  street: z.string().min(5, "Street must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  
  // Documents
  documents: z.any().optional(),
})

export type VendorRegistrationFormData = z.infer<typeof vendorRegistrationSchema>

export const driverRegistrationSchema = z.object({
  // Personal Information
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().min(10, "Phone number must be at least 10 characters"),
  email: z.string().email("Invalid email address"),
  experience: z.string().min(1, "Experience is required"),
  expiry: z.string().min(1, "License expiry is required"),

  // Location Information
  warehouseLocation: z.string().min(2, "Warehouse name/location is required"),
  street: z.string().min(5, "Street must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  postalCode: z.string().min(3, "Postal code must be at least 3 characters"),
  
  // Documents
  documents: z.any().optional(),
})

export type DriverRegistrationFormData = z.infer<typeof driverRegistrationSchema>
