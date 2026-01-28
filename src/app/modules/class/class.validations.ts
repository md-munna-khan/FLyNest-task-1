import { z } from 'zod';

export const createClassSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    section: z.string().min(1)
  })
});

export const enrollSchema = z.object({
  body: z.object({
    studentId: z.string().uuid()
  })
});
