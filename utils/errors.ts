export enum OrderErrorType {
  OrderNotFound = "OrderNotFound",
  InvalidOrder = "InvalidOrder",
  OutOfStock = "OutOfStock",
  InvalidAmount = "InvalidAmount",
}

export class OrderError extends Error {
  type: OrderErrorType;
  lunchId?: string;

  constructor(message: string, type: OrderErrorType, lunchId?: string) {
    super(message);
    this.type = type;
    this.lunchId = lunchId;
    Error.captureStackTrace(this, this.constructor);
  }
}
