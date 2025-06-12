class ResponseError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode; // Properti dinamai `statusCode`
    this.name = "ResponseError";
  }
}
export { ResponseError };
