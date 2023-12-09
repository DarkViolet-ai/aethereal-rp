export class DarkVioletError extends Error {
  code: number;
  name: string;
  message: string;

  constructor(code: number, name: string, message: string) {
    super(message);
    this.code = code;
    this.name = name;
    this.message = message;
  }
}

export const dvErrorCodes = {
  // 400
  BadRequest: 400,
  // 401
  Unauthorized: 401,
  // 403
  Forbidden: 403,
  // 404
  NotFound: 404,
  // 409
  Conflict: 409,
  // 500
  InternalServerError: 500,
  // 501
  NotImplemented: 501,
  // 502
  BadGateway: 502,
  // 503
  ServiceUnavailable: 503,
  // 504
  GatewayTimeout: 504,
};

// define the error codes as functions that take a message and return a new error
export const dvError = {
  // 400
  badRequest: (message: string) =>
    new DarkVioletError(400, "BadRequest", message),
  // 401
  unauthorized: (message: string) =>
    new DarkVioletError(401, "Unauthorized", message),
  // 403
  forbidden: (message: string) =>
    new DarkVioletError(403, "Forbidden", message),
  // 404
  notFound: (message: string) => new DarkVioletError(404, "NotFound", message),
  // 409
  conflict: (message: string) => new DarkVioletError(409, "Conflict", message),
  // 500
  internalServerError: (message: string) =>
    new DarkVioletError(500, "InternalServerError", message),
  // 501
  notImplemented: (message: string) =>
    new DarkVioletError(501, "NotImplemented", message),
  // 502
  badGateway: (message: string) =>
    new DarkVioletError(502, "BadGateway", message),
  // 503
  serviceUnavailable: (message: string) =>
    new DarkVioletError(503, "ServiceUnavailable", message),
  // 504
  gatewayTimeout: (message: string) =>
    new DarkVioletError(504, "GatewayTimeout", message),
};
