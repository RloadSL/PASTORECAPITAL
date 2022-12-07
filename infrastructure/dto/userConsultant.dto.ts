import { Avatar } from "domain/Interfaces/Avatar";
import { Country } from "domain/Interfaces/Country";

export interface UserConsultantDto {
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
}