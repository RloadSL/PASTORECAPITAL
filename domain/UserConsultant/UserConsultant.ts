import { Avatar } from "domain/Interfaces/Avatar";
import { Country } from "domain/Interfaces/Country";
import { User } from "domain/User/User";
import { ServiceDto } from "infrastructure/dto/service.dto";
import { UserConsultantDto } from "infrastructure/dto/userConsultant.dto";
import userConsultantRepository from "infrastructure/repositories/userConsultant.repository";

export class UserConsultant{
  private static instance: UserConsultant;
  id:string;
  uid:string;
  name:string;
  lastname:string;
  country:Country;
  avatar:Avatar;
  description:string;
  keywords?: string[];
  linkedin?: string;
  created_at?: Date;
  state?: 'new' | 'active' | 'disabled';
  constructor(user:User, data:UserConsultantDto){
    this.uid = user.uid;
    this.name = user.name;
    this.lastname = user.lastname;
    this.id = data.id as string;
    this.country = data.country;
    this.avatar = data.avatar as Avatar;
    this.description = data.description;
    this.keywords = data.keywords;
    this.linkedin =  data.linkedin;
    this.created_at = data.created_at;
    this.state = data.state;
  }

  private update(data: UserConsultantDto){
    this.id = data.id as string;
    this.country = data.country;
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
    const res:User[] = userConsultantRepository.getClients(this.id);
    return res;
  }

  async createService(data:ServiceDto){
    await userConsultantRepository.createService(data);
  }

  async getServices(query:any){
    await userConsultantRepository.getService(query);
  }

  async closeConsultantAccount(){
    await userConsultantRepository.deleteUserConsultant(this.id);
  }
}