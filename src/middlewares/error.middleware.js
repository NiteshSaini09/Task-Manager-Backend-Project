export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const success = err.success || false;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success,
    message
  }); 
}