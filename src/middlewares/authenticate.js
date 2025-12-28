import createHttpError from 'http-errors';
import { SessionModel } from '../db/models/sessionModel.js';
import { userModel } from '../db/models/userModel.js';

export const authenticate = async (request, response, next) => {
  const authorization = request.get('authorization');

  if (!authorization) {
    next(createHttpError(401, 'Authorization header is missing'));
    return;
  }

  const [bearer, token] = authorization.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Invalid token format'));
    return;
  }

  const session = await SessionModel.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Invalid token'));
    return;
  }

  if (session.accessTokenValidUntil < new Date()) {
    next(createHttpError(401, 'Token expired'));
    return;
  }

  const user = await userModel.findById(session.userId);

  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  request.user = user;

  next();
};

export default authenticate;
