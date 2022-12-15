import { Avatar } from "domain/Interfaces/Avatar";
import { Country } from "domain/Interfaces/Country";

export interface UserConsultantDto {
  id?:string;
  uid:string;
  country:Country;
  avatar: Avatar | string;
  description:string;
  keywords?: string[];
  linkedin?: string;
  created_at?: Date;
}

export interface UserConsultantInitialValues {
  country?:Country;
  description?:string;
  keywords?: string;
  linkedin?: string;
}