import { Request } from 'express';
import { Types } from 'mongoose';
export type UserRole = 'USER' | 'ADMIN' | 'MANAGER';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';

export interface User extends Document {
  _id?: Types.ObjectId;
  email: string;
  name: string;
  password: string;
  role: "admin" | "user"
}

export interface UserSignUpRequest extends Request {
  body: User;
}

export interface UserSignInRequest extends Request {
  body: {
    email: string;
    password: string;
  };
}

export interface GlobalError extends Error {
  statusCode: number;
  message: string;
  stackTrace: string;
  success: boolean;
}

export interface AuthCookie {
  accessToken: string;
  refreshToken: string;
}

export interface AuthenticateReq extends Request {
  auth: {
    id: string;
    email: string;
    sub?: string;
    role: string;
  };
}

export interface IRefreshTokenPayload {
  sub: string | Types.ObjectId;
  id: string;
}

export interface ChangePasswordRequest extends Request, AuthenticateReq {
  body: {
    oldPassword: string;
    newPassword: string;
  };
}

export interface Task extends Document {
  _id?: Types.ObjectId;
  assignedUser: Types.ObjectId;
  title: string;
  description: string;
  dueDate: string | Date;
  creatorId: Types.ObjectId;
  status: "To Do" | "In Progress" | "Completed";
  priority: "Low" | "Medium" | "High";
}

export interface AddTaskRequest extends Request, AuthenticateReq {
  body: Task
}

export interface PaginationRequest extends Request, AuthenticateReq {
  query: {
    page: string;
    limit: string;
    orderBy: string;
  };
}

export interface PaginationData {
  page: string;
  limit: string;
  orderBy: string;
}


export interface AssignTaskRequest extends Request, AuthenticateReq {
  body: Task;
  query: {
    userid: string;
  };
}