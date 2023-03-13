export class AccesibilityService{
  
  private static instance: AccesibilityService;
  public static getInstance(): AccesibilityService {
    if (!AccesibilityService.instance) {
      AccesibilityService.instance = new AccesibilityService();
    }
    return AccesibilityService.instance;
  }
  private constructor(){

  }

  guest:Array<any> = [];
  basic:Array<any> = [];
  plus:Array<any> = [];
  premium:Array<any> = [];

  
}

