import type { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
import { StudentService } from './student.service';

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const student = await StudentService.createStudent(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Student created', data: student });
});

const listStudents = catchAsync(async (req: Request, res: Response) => {
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 10);
  const result = await StudentService.listStudents(page, limit);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Students retrieved', data: result });
});

const getStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const student = await StudentService.getStudent(id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Student retrieved', data: student });
});

const enrollStudent = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // class id
  const { studentId } = req.body;
  const student = await StudentService.enrollStudent(id, studentId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Student enrolled', data: student });
});

export const StudentController = {
  createStudent,
  listStudents,
  getStudent,
  enrollStudent
};
