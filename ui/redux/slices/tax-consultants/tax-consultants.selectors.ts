import { UserConsultant } from "domain/UserConsultant/UserConsultant";

export const getConsultants = (state:any) =>  {
  const taxCosultantSate:any = state.taxCosultants.queryResult;
  return taxCosultantSate.items;
};  

export const getCurrentConsultant = (state:any):UserConsultant | undefined =>  {
  const consultant:UserConsultant | undefined = state.taxCosultants.currentConsultant;
  return consultant;
}; 