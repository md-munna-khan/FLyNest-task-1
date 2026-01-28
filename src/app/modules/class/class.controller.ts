import type { Request, Response } from 'express';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status-codes';
import { ClassService } from './class.service';

const createClass = catchAsync(async (req: Request, res: Response) => {
  const cls = await ClassService.createClass(req.body);
  sendResponse(res, { statusCode: httpStatus.CREATED, success: true, message: 'Class created', data: cls });
});

const enroll = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params; // class id
  const { studentId } = req.body;
  const student = await ClassService.enrollStudent(id, studentId);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Student enrolled', data: student });
});

const getStudents = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const students = await ClassService.getClassStudents(id);
  sendResponse(res, { statusCode: httpStatus.OK, success: true, message: 'Students retrieved', data: students });
});

export const ClassController = {
  createClass,
  enroll,
  getStudents
};
