import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { StudentRoutes } from '../modules/student/student.routes';
import { ClassRoutes } from '../modules/class/class.routes';




const router = express.Router();

const moduleRoutes = [
    {
        path: '/auth',
        route: AuthRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/classes',
        route: ClassRoutes
    },
   

];

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router;