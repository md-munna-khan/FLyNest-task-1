import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status-codes';

const createClass = async (payload: { name: string; section: string }) => {
  const cls = await prisma.class.create({ data: payload });
  return cls;
};

const enrollStudent = async (classId: string, studentId: string) => {

  const cls = await prisma.class.findUnique({ where: { id: classId } });
  if (!cls) throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');

  const student = await prisma.student.update({ where: { id: studentId }, data: { classId } });
  return student;
};

const getClassStudents = async (classId: string) => {
  const cls = await prisma.class.findUnique({ where: { id: classId }, include: { students: true } });
  if (!cls) throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');
  return cls.students;
};

export const ClassService = {
  createClass,
  enrollStudent,
  getClassStudents
};
