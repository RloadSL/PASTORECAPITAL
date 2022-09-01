
import { FirebaseApp } from 'firebase/app';
import { Functions, getFunctions, httpsCallable } from 'firebase/functions';
import FireFirebase from './firebase';

class FireFunctions {
  private static instance: FireFunctions;
  private _functions: Functions;
  private constructor(app: FirebaseApp) {
    this._functions = getFunctions(app);
  }

  public static getInstance(app: FirebaseApp): FireFunctions {
    if (!FireFunctions.instance) {
      FireFunctions.instance = new FireFunctions(app);
    }
    return FireFunctions.instance;
  }

  async onCallFunction(functionName:string, data:any):Promise<any>{
    const fn = httpsCallable(this._functions, functionName);
    try {
      const response = await fn(data);
      return response.data;
    } catch (error) {
      return error;
    }
  }
}

export default FireFunctions.getInstance(FireFirebase.app);