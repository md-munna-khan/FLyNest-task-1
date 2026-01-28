import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createStudentSchema, enrollStudentSchema } from './student.validations';
import { StudentController } from './student.controller';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/', auth(Role.ADMIN), validateRequest(createStudentSchema), StudentController.createStudent);

router.get('/', auth(Role.ADMIN, Role.TEACHER), StudentController.listStudents);

router.get('/:id', auth(Role.ADMIN, Role.TEACHER), StudentController.getStudent);


router.post('/:id/enroll', auth(Role.ADMIN, Role.TEACHER), validateRequest(enrollStudentSchema), StudentController.enrollStudent);

export const StudentRoutes = router;
