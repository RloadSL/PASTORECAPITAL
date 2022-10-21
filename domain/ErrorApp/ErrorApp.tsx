import { ErrorAuth } from "infrastructure/firebase/authentication.firebase";


export class ErrorApp {
  readonly type = 'error';
  private _errorCode: string;
  public get errorCode(): string {
    return this._errorCode;
  }
  private _errorMessage: string;
  public get errorMessage(): string {
    return this._errorMessage;
  }
  constructor(data: ErrorAuth | { errorCode: string, errorMessage: string }, type='error') {
    this._errorCode = data.errorCode;
    this._errorMessage = data.errorMessage;
  }
}