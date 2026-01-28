import prisma from '../../../shared/prisma';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status-codes';

const createStudent = async (payload: { name: string; age: number; classId?: string }) => {
  const student = await prisma.student.create({ data: payload });
  return student;
};

const listStudents = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    prisma.student.findMany({ skip, take: limit }),
    prisma.student.count()
  ]);

  return { items, total, page, limit };
};

const getStudent = async (id: string) => {
  const student = await prisma.student.findUnique({ where: { id } });
  if (!student) throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
  return student;
};

const enrollStudent = async (classId: string, studentId: string) => {

  const cls = await prisma.class.findUnique({ where: { id: classId } });
  if (!cls) throw new ApiError(httpStatus.NOT_FOUND, 'Class not found');

  const student = await prisma.student.update({ where: { id: studentId }, data: { classId } });
  return student;
};

export const StudentService = {
  createStudent,
  listStudents,
  getStudent,
  enrollStudent
};
