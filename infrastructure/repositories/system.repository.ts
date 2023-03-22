import { PLANS } from "infrastructure/dto/system_config.dto";
import firestoreFirebase from "infrastructure/firebase/firestore.firebase";
import { FireFunctionsInstance } from "infrastructure/firebase/functions.firebase";

class SystemConfigRepository {
  private static instance: SystemConfigRepository;

  public static getInstance(): SystemConfigRepository {
    if (!SystemConfigRepository.instance) {
      SystemConfigRepository.instance = new SystemConfigRepository();
    }
    return SystemConfigRepository.instance;
  }

  async getPlans(): Promise<PLANS | undefined>{
    const res = await firestoreFirebase.getDoc('system_config', 'plans')
    if(res?.exists()){
      return  res.data() as PLANS;  
    }
    console.error('Error interno falta la configuracion inicial de planes del sistema. Ponte en contacto con tus administradores de servicio.')
    return undefined;
  }

   /**
   * Procesa la contratación del servicio por parte del usuario
   */
   async hirePlansSubscription(data:{ plan_name: 'Basic' | 'Plus' | 'Premium', interval: 'month' | 'year' , uid:string}){
    const res = await FireFunctionsInstance.onCallFunction('PaymentSubscriptionTriggerFunctions', data)
    if(!res.error){
      return res;
    }else{
      return null;
    }
  }

  async updatePlansSubscription(data:{ plan_name: 'Basic' | 'Plus' | 'Premium', interval: 'month' | 'year' , sub_id:string ,uid:string}){
    const res = await FireFunctionsInstance.onCallFunction('PaymentUpdateSubscriptionTriggerFunction', data)
    if(!res.error){
      return res;
    }else{
      return null;
    }
  }

  async updatePlansSubscriptionPrice(data:{basic:{price: {month: number, year: number}}, premium:{price: {month: number, year: number}}, plus:{price:{month: number, year: number}}}){
    //{basic:{price: {month: 39, year: 200}}, premium:{price: {month: 99, year: 500}}, plus:{price:{month: 69, year: 300}}}
    const res = await FireFunctionsInstance.onCallFunction('PaymentUpdateSubscriptionPriceTriggerFunctions', data)
    if(!res.error){
      return res;
    }else{
      return null;
    }

    console.log(data)
  }

  async cancelSubscription(data:{sub_id:string}){
    const res = await FireFunctionsInstance.onCallFunction('CancelSubscriptionTriggerFunction', data)
    if(!res.error){
      return res;
    }else{
      return null;
    }
  }

  async getStripeInvoices(data:{page?:string,created?:number}){
    const res = await FireFunctionsInstance.onCallFunction('StripeInvoicesOnCallFunctions', data)
    if(!res.error){
      return res;
    }else{
      return null;
    }
  }
}



export default SystemConfigRepository.getInstance()