import { z } from 'zod';

export const createStudentSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    age: z.number().int().nonnegative(),
    classId: z.string().uuid().optional()
  })
});

export const enrollStudentSchema = z.object({
  body: z.object({
    studentId: z.string().uuid()
  })
});
