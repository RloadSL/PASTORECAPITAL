import { ErrorAuth } from "infrastructure/firebase/authentication.firebase";


type InfoType = 'warning' | 'info' | 'success' | 'info';
export class InfoApp {
  type: InfoType;
  private _errorCode: string;
  public get errorCode(): string {
    return this._errorCode;
  }
  private _errorMessage: string;
  public get errorMessage(): string {
    return this._errorMessage;
  }
  constructor(data: { code: string, message: string }, type?: InfoType) {
    this._errorCode = data.code;
    this._errorMessage = data.message;
    this.type = type || 'info';
  }
}