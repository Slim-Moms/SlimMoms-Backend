import { HttpError } from 'http-errors';

// eslint-disable-next-line no-unused-vars
export const errorHandler = (error, request, response, next) => {
  if (error instanceof HttpError) {
    return response.status(error.statusCode).send({
      message: error.message,
      status: error.status,
    });
  }

  response.status(500).send({
    message: 'Internal Server Error',
    status: 500,
  });
};
