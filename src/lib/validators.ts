import { z } from 'zod';

export const registerSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères'),
  email: z.string().email('Email invalide').toLowerCase(),
  phone: z.string().min(8, 'Numéro de téléphone invalide'),
  password: z.string().min(8, 'Minimum 8 caractères avec chiffres et lettres')
    .regex(/[0-9]/, 'Doit contenir au moins un chiffre')
    .regex(/[a-zA-Z]/, 'Doit contenir au moins une lettre'),
  role: z.enum(['client', 'vendor', 'professional']),
});

export const loginSchema = z.object({
  email: z.string().email('Email invalide').toLowerCase(),
  password: z.string().min(1, 'Mot de passe requis'),
});

export const productSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(5000),
  price: z.number().positive('Le prix doit être positif'),
  stock: z.number().int().min(0),
  categoryId: z.string().min(1),
  shopId: z.string().min(1),
});

export const shopSchema = z.object({
  name: z.string().min(2).max(200),
  description: z.string().min(10).max(3000),
  phone: z.string().min(8),
  address: z.string().min(5),
  city: z.string().min(2),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ProductInput = z.infer<typeof productSchema>;
export type ShopInput = z.infer<typeof shopSchema>;