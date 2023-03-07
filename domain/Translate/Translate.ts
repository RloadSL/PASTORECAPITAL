export class Translate {
  private static instance: Translate;
  private _currentLocal: 'es' | 'en' = 'es'
  
  public get currentLocal() :  'es' | 'en' {
    return this._currentLocal
  }
  
  
  public set currentLocal(v : 'es' | 'en') {
    this._currentLocal = v;
  }
  private constructor() {}

  static getInstance(): Translate {
    if (!Translate.instance) {
        Translate.instance = new Translate();
    }
    return Translate.instance;
  }
}

export default Translate.getInstance()