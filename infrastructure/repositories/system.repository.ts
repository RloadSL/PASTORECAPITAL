import { PLANS } from "infrastructure/dto/system_config.dto";
import firestoreFirebase from "infrastructure/firebase/firestore.firebase";

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
    alert('Error interno falta la configuracion inicial de planes del sistema. Ponerte en contacto con tus administradores de servicio.')
    return undefined;
  }
}

export default SystemConfigRepository.getInstance()