import { z } from 'zod';

export const phoneSchema = z.string().regex(/^\+?3\d{9,10}$/, 'Teléfono colombiano no válido');

export const createLeadSchema = z.object({
  fullName: z.string().min(2, 'Nombre requerido'),
  phone: phoneSchema,
  email: z.string().email('Correo no válido'),
  program: z.string().min(1, 'Selecciona un programa'),
  campus: z.string().min(1, 'Selecciona un campus'),
  photo: z.string().min(1, 'Debe seleccionar una fotografía'),
});
