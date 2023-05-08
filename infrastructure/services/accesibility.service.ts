
import FireFirestore from "../firebase/firestore.firebase";

class AccesibilityService {

  private static instance: AccesibilityService;
  public static getInstance(): AccesibilityService {
    if (!AccesibilityService.instance) {
      AccesibilityService.instance = new AccesibilityService();
    }
    return AccesibilityService.instance;
  }
  private constructor() {

  }

  guest: Array<any> = [];
  basic: Array<any> = [];
  plus: Array<any> = [];
  premium: Array<any> = [];

  /**
   * Secciones con permisos requeridos 
   */
  modules = [
    '/news',
    '/academy/tutorials/[tutorial-slug]',
    '/academy/courses/[course-slug]',
    '/research/bitcoins-altcoins/[category-slug]/[article-slug]',
    '/research/flash-updates',
    '/discord',
    '/webinars/[w_id]',
    '/webinars/deferred/[w_id]',
    '/amas/[chatroom_id]'
  ]

  /**
   * Todas las direcciones públicas de la plataforma
   */
  system_public_module = [
    '/',
    '/login',
    '/recover-password',
    '/thank-you-purchase',
    '/subscription',
    '/webinars',
    '/webinars/deferred',
    '/amas',
    '/amas/[chatroom_id]',
    '/subscription/[plan-subscription]',
    '/users/[uid]',
    '/users/[uid]/notifications',
    '/users/[uid]/invoices',
    ////////
    '/academy/courses/[course-slug]/[lesson-slug]',
    '/academy',
    '/academy/tutorials',
    '/academy/courses',
    '/research',
    '/research/bitcoins-altcoins',
    '/research/bitcoins-altcoins/[category-slug]',
    '/tax-consultant',
    '/tax-consultant/consultants',
    '/tax-consultant/consultants/[id]',
    '/tax-consultant/consultants/[id]/services/[service_id]',
    '/tax-consultant/consultants/[id]/services/[service_id]/payment',
    '/support',
    '/tools'
  ]

  
  public get system_subscription_permission_module() : any {
    return {
      guest: [
        ...this.system_public_module,
        ...this.guest
      ],
      basic: [
        ...this.system_public_module,
        ...this.basic
      ],
      plus: [
        ...this.system_public_module,
        ...this.plus
      ],
      premium: [
        ...this.system_public_module,
        ...this.premium
      ]
    }
  }
  
  isLoaded =false;

  async updatePermissions(data: { guest: string[], basic: string[], plus: string[], premium: string[] }) {
   const res = await FireFirestore.setDoc('system_config', 'permissions', data)
  }

  async getPermissions() {
    const res = await FireFirestore.getDoc('system_config', 'permissions')
    const {guest, plus, basic, premium} = res?.data() as any;
    this.guest = guest;
    this.basic = basic;
    this.premium = premium;
    this.plus = plus;
    this.isLoaded = true;
  }
}

export default AccesibilityService.getInstance()