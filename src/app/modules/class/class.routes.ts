import express from 'express';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { createClassSchema, enrollSchema } from './class.validations';
import { ClassController } from './class.controller';
import { Role } from '@prisma/client';

const router = express.Router();

router.post('/', auth(Role.ADMIN), validateRequest(createClassSchema), ClassController.createClass);

router.post('/:id/enroll', auth(Role.ADMIN, Role.TEACHER), validateRequest(enrollSchema), ClassController.enroll);

router.get('/:id/students', auth(Role.ADMIN, Role.TEACHER), ClassController.getStudents);

export const ClassRoutes = router;
