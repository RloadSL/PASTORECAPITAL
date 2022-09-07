
import { FirebaseApp } from 'firebase/app';
import { connectFunctionsEmulator, Functions, getFunctions, httpsCallable } from 'firebase/functions';
import FireFirebase from './firebase';
/**
 * Implentación de Functions de Firebase 
 */
export class FireFunctions {
  private static instance: FireFunctions;
  private _functions: Functions;
  private constructor(app: FirebaseApp) {
    this._functions = getFunctions(app);
    if(FireFirebase.emulatiorEnable){
      connectFunctionsEmulator(this._functions, "localhost", 5001);
    }
  }

  public static getInstance(): FireFunctions {
    if (!FireFunctions.instance) {
      FireFunctions.instance = new FireFunctions(FireFirebase.app);
    }
    return FireFunctions.instance;
  }

  async onCallFunction(functionName:string, data?:any):Promise<{status:number, data?:any, error?:any}>{
    const fn = httpsCallable(this._functions, functionName);
    try {
      const response = (await fn(data)) as {status:number, data?:any, error?:string};
      return response.data;
    } catch (error) {
      return {status: 200, error: error};
    }
  }
}

export default FireFunctions.getInstance();