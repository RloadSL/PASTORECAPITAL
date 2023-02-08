import { Avatar } from "domain/Interfaces/Avatar";
import { Country } from "domain/Interfaces/Country";

export interface UserConsultantDto {
  id?:string;
  uid:string;
  country?:string;
  avatar?: Avatar | string;
  description:string;
  keywords?: string[];
  linkedin?: string;
  created_at: Date;
  state?: 'new' | 'active' | 'disabled'
  user_count?: number,
  calendly?:string 
}

export interface UserConsultantInitialValues {
  country?:string;
  description?:string;
  keywords?: string;
  linkedin?: string;
  calendly?:string
}