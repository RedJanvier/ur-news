class ErrorResponse extends Error {
  constructor(public message = 'Server Error!', public statusCode = 500) {
    super(message);
  }
}

export default ErrorResponse;
