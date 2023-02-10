import { UserConsultant } from "domain/UserConsultant/UserConsultant";

export const getConsultants = (state:any) =>  {
  const taxCosultantSate:any = state.taxCosultants.queryResult;
  return taxCosultantSate;
};  

export const getCurrentConsultant = (state:any):UserConsultant | 'NOT_CONSULTANT' | undefined =>  {
  const consultant = state.taxCosultants.currentConsultant;
  return consultant;
}; 

export const getTaxConsultantLoading = (state:any):boolean =>  {
  const loading = state.taxCosultants.loading;
  return loading;
}; 