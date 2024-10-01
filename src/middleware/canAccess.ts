import createHttpError from "http-errors";
import { AuthenticateReq } from "../types";
import { Request, NextFunction, Response } from "express";

export const canAccess = (roles: string[]) => {
    return (req: Request, _res: Response, next: NextFunction) => {
        const _req = req as AuthenticateReq;
        console.log(_req.auth);

        const roleFromToken = _req.auth.role;
        if (!roles.includes(roleFromToken)) {
            const error = createHttpError(
                403,
                "You don't have enough permissions."
            );
            next(error);
            return;
        }
        next();
    };
};
