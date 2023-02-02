import { UserConsultant } from "domain/UserConsultant/UserConsultant";

export const getConsultants = (state:any) =>  {
  const taxCosultantSate:any = state.taxCosultants.queryResult;
  return taxCosultantSate.items;
};  

export const getCurrentConsultant = (state:any):UserConsultant | 'NOT_CONSULTANT' | undefined =>  {
  const consultant = state.taxCosultants.currentConsultant;
  return consultant;
}; 