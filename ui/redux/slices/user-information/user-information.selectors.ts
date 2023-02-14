import { UserConsultant } from "domain/UserConsultant/UserConsultant";

export const getNotifications = (state:any) =>  {
  const notifications:any = state.userInformation.queryResultNoti;
  return notifications;
};  

export const getInvoices = (state:any) =>  {
  const invoices:any = state.userInformation.queryResultInvoice;
  return invoices;
};  


export const getUserInformationLoading = (state:any):boolean =>  {
  const loading = state.userInformation.loading;
  return loading;
}; 