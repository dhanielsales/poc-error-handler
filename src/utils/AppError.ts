export default class AppError extends Error {
  public readonly message: string;
  public readonly details: any;
  public readonly statusCode: number;

  constructor(message: string, statusCode = 400, details?: any, name?: string) {
    super(message)
    this.name = name || this.name;
    this.message = message;
    this.details = details;
    this.statusCode = statusCode;
  }
}
