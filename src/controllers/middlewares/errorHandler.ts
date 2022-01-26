import { Request, Response, NextFunction } from 'express';
import AppError from '../../utils/AppError';

export function errorHandler(
  err: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): Response {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
      details: err.details && err.details,
    });
  }

  console.log(`Error: error on route ${request.method} ${request.path}`)
  console.log(err)

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
}
