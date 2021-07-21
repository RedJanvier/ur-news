import { ErrorResponse } from '../utils';

const errorHandler = (err, req, res, next) => {
  let error = { ...err, message: err.message };

  console.log(`Error: ${err}`.red, err);

  if (err.name === 'CastError') {
    const message = `Resource not found of id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }
  if (err.code === 11000) {
    const message = 'Values entered already exist';
    error = new ErrorResponse(message, 400);
  }
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }
  if (error.message === 'jwt expired') {
    error.statusCode = 401;
    error.message = 'please signup/login first!';
  }
  if (error.message === `Cannot read property 'startsWith' of undefined`) {
    error.statusCode = 401;
    error.message = 'please provide a token';
  }
  if (error.message === `jwt malformed`) {
    error.statusCode = 401;
    error.message = 'please provide a valid token';
  }
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || 'Server Error' });
  next();
};

export default errorHandler;
