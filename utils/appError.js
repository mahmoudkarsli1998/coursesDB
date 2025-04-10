class AppError extends Error {
    constructor(message, statusCode, statusText) {
      super(message); // Initialize the parent Error with the message
      this.statusCode = statusCode;
      this.statusText = statusText;
      // Optionally capture the stack trace (excluding the constructor)
      Error.captureStackTrace(this, this.constructor);
    }
  
    // Static create function returns a new instance of AppError
    static create(message, statusCode, statusText) {
      return new AppError(message, statusCode, statusText);
    }
  }
  
  module.exports = AppError;
  