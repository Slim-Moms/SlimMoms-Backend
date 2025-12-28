import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUser,
} from '../services/authServices.js';

export const registerUserController = async (request, response) => {
  const { name, email, password } = request.body;

  const newUser = await registerUser({
    name: name,
    email: email,
    password: password,
  });
  response.status(201).json({
    message: 'User created successfully',
    status: 201,
    data: newUser,
  });
};

export const loginUserController = async (request, response) => {
  const session = await loginUser(request.body);

  response.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  response.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  response.status(200).json({
    message: 'User logged in successfully and session created',
    status: 200,
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (request, response) => {
  const { sessionId } = request.cookies;

  await logoutUser(sessionId);
  response.clearCookie('refreshToken');
  response.clearCookie('sessionId');

  response.status(204).send({
    message: 'User logged out successfully',
    status: 204,
  });
};

export const refreshUserController = async (request, response) => {
  const { refreshToken, sessionId } = request.cookies;

  const session = await refreshUser({ refreshToken, sessionId });

  response.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  response.cookie('sessionId', session._id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  response.status(200).json({
    message: 'User refresh flow successfully completed',
    status: 200,
    data: {
      accessToken: session.accessToken,
    },
  });
};
