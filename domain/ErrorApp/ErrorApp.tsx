import { ErrorAuth } from "infrastructure/firebase/authentication.firebase";


type ErrorType = 'warning' | 'error' | 'info' | 'success' | 'info';
export class ErrorApp {
  type: ErrorType;
  private _errorCode: string;
  public get errorCode(): string {
    return this._errorCode;
  }
  private _errorMessage: string;
  public get errorMessage(): string {
    return this._errorMessage;
  }
  constructor(data: ErrorAuth | { errorCode: string, errorMessage: string }, type?: ErrorType) {
    this._errorCode = data.errorCode;
    this._errorMessage = data.errorMessage;
    this.type = type || 'error';
  }
}