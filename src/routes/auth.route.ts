/* eslint-disable @typescript-eslint/no-misused-promises */
import { Request, Response, NextFunction, Router } from 'express';
import AuthController from '../controllers/AuthController';
import { AuthService } from '../services';
import {
  userLoginValidator,
  userRegisterValidator,
} from '../validators/auth-validator';
import {
  AuthenticateReq,
  ChangePasswordRequest,
  UserSignInRequest,
  UserSignUpRequest,
} from '../types';
import User from '../models/User';
import QueryService from '../services/QueryService';
import TokenService from '../services/TokenService';
import Refresh from '../models/Refresh';
import authenticate from '../middleware/authenticate';
import UserDto from '../dtos/Auth-dto';
import validateRefreshToken from '../middleware/validateRefreshToken';
import parseRefreshToken from '../middleware/parseRefreshToken';

const authRouter = Router();
const authService = new AuthService(User);
const queryService = new QueryService(User);
const tokenService = new TokenService(Refresh);


const userDto = new UserDto();
const authController = new AuthController(
  authService,
  queryService,
  tokenService,
  userDto,
);

authRouter.post(
  '/register',
  userRegisterValidator,
  (req: Request, res: Response, next: NextFunction) =>
    authController.register(req as UserSignUpRequest, res, next),
);

authRouter.post(
  '/login',
  userLoginValidator,
  (req: Request, res: Response, next: NextFunction) =>
    authController.login(req as UserSignInRequest, res, next),
);

authRouter.get(
  '/self',
  authenticate,
  (req: Request, res: Response, next: NextFunction) =>
    authController.self(req as AuthenticateReq, res, next),
);

authRouter.get(
  '/refresh-token',
  validateRefreshToken,
  (req: Request, res: Response, next: NextFunction) =>
    authController.refreshToken(req as AuthenticateReq, res, next),
);

authRouter.delete(
  '/logout',
  authenticate,
  parseRefreshToken,
  (req: Request, res: Response, next: NextFunction) =>
    authController.logout(req as AuthenticateReq, res, next),
);

authRouter.put(
  '/change-password',
  authenticate,
  (req: Request, res: Response, next: NextFunction) =>
    authController.changePassword(req as ChangePasswordRequest, res, next),
);

export default authRouter;
