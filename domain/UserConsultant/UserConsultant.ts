import { Avatar } from "domain/Interfaces/Avatar";
import { Country } from "domain/Interfaces/Country";
import { User } from "domain/User/User";
import { ServiceDto } from "infrastructure/dto/service.dto";
import { UserConsultantDto } from "infrastructure/dto/userConsultant.dto";
import userConsultantRepository from "infrastructure/repositories/userConsultant.repository";
import countryList from 'react-select-country-list'

export const NOT_CONSULTANT = 'NOT_CONSULTANT'
export class UserConsultant{
  private static instance: UserConsultant;
  id:string;
  uid:string;
  name:string;
  lastname:string;
  country?:Country;
  avatar?:Avatar;
  description:string;
  keywords?: string[];
  linkedin?: string;
  created_at?: Date;
  state?: 'new' | 'active' | 'disabled';
  user_count?: number 
  calendly?:string
  constructor(user:User, data:UserConsultantDto){
    this.user_count = data.user_count
    this.uid = user.uid;
    this.name = user.name;
    this.lastname = user.lastname;
    this.id = data.id as string;
    this.country =  this.parseCountry(data.country)
    this.avatar = data.avatar as Avatar;
    this.description = data.description;
    this.keywords = data.keywords;
    this.linkedin =  data.linkedin;
    this.created_at = data.created_at;
    this.state = data.state;
    this.calendly = data.calendly
  }
  private parseCountry = (isoCountry?: string)=>{
    return isoCountry ? {
      flagUrl : `https://flagcdn.com/w40/${isoCountry?.toLocaleLowerCase()}.jpg`,
      iso: isoCountry as string,
      label: countryList().getLabel(isoCountry as string)
    } : undefined;
  }
  private update(data: UserConsultantDto){
    this.id = data.id as string;
    this.country = this.parseCountry(data.country);
    this.avatar = data.avatar as Avatar;
    this.description = data.description;
    this.keywords = data.keywords;
    this.linkedin =  data.linkedin;
    this.created_at = data.created_at;
  }

  async set(data:UserConsultantDto){
    const dto:UserConsultantDto = await userConsultantRepository.setUserConsultant(data);
    this.update(dto)
  }

  async getClients(): Promise<User[]>{
    const res:any = userConsultantRepository.getClients(this.id);
    return res;
  }

  async createService(data:ServiceDto){
    await userConsultantRepository.createService(data);
  }

  async getActiveServices(){
    console.log('getActiveServices')
    const s = await userConsultantRepository.getServices(this.id,true);
    console.log('getActiveServices',s)
    return s;
  }

  async closeConsultantAccount(){
    await userConsultantRepository.deleteUserConsultant(this.id);
  }
}