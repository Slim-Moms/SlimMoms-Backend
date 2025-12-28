import {
  loginUser,
  registerUser,
  logoutUser,
  refreshUser,
} from '../services/authServices.js';

// 1. REGISTER CONTROLLER
export const registerUserController = async (req, res, next) => {
  try {
    const newUser = await registerUser(req.body);

    res.status(201).json({
      status: 201,
      message: 'User created successfully',
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

// 2. LOGIN CONTROLLER
export const loginUserController = async (req, res, next) => {
  try {
    const session = await loginUser(req.body);

    // Refresh Token Cookie (Uzun ömürlü)
    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });

    // Session ID Cookie
    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });

    res.status(200).json({
      status: 200,
      message: 'User logged in successfully',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

// 3. LOGOUT CONTROLLER
export const logoutUserController = async (req, res, next) => {
  try {
    const { sessionId } = req.cookies;

    if (sessionId) {
      await logoutUser(sessionId);
    }

    res.clearCookie('refreshToken');
    res.clearCookie('sessionId');

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// 4. REFRESH CONTROLLER
export const refreshUserController = async (req, res, next) => {
  try {
    const { refreshToken, sessionId } = req.cookies;
    const session = await refreshUser({ refreshToken, sessionId });

    res.cookie('refreshToken', session.refreshToken, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });

    res.cookie('sessionId', session._id, {
      httpOnly: true,
      expires: session.refreshTokenValidUntil,
    });

    res.status(200).json({
      status: 200,
      message: 'Refresh successful',
      data: {
        accessToken: session.accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
