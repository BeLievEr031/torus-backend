import { expressjwt } from 'express-jwt';
import Config from '../config/config';
import { Request } from 'express';
import { AuthCookie } from '../types';

export default expressjwt({
  secret: Config.REFRESH_TOKEN_SCERET!,
  algorithms: ['HS256'],
  getToken: (req: Request) => {
    const { refreshToken } = req.cookies as AuthCookie;
    return refreshToken;
  },
});
