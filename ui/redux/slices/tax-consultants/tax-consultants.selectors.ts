
export const getConsultants = (state:any) =>  {
  const taxCosultantSate:any = state.taxCosultants.queryResult;
  return taxCosultantSate.items;
};  