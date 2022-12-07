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
  keywords: string[];
  linkeding: string;
  created_at: Date;

  private constructor(user:User, data:UserConsultantDto){
    this.uid = user.uid;
    this.name = user.name;
    this.lastname = user.lastname;
    this.id = data.id;
    this.country = data.country;
    this.avatar = data.avatar;
    this.description = data.description;
    this.keywords = data.keywords;
    this.linkeding =  data.linkeding;
    this.created_at = data.created_at;
  }

  private update(data: UserConsultantDto){
    this.id = data.id;
    this.country = data.country;
    this.avatar = data.avatar;
    this.description = data.description;
    this.keywords = data.keywords;
    this.linkeding =  data.linkeding;
    this.created_at = data.created_at;
  }

  getInstance(user:User,data:UserConsultantDto){
    if(!UserConsultant.instance){
      UserConsultant.instance = new UserConsultant(user, data);
    } 
    
    return UserConsultant.instance;
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