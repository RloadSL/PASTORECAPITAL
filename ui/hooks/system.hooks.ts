import { ErrorApp } from "domain/ErrorApp/ErrorApp"
import { InfoApp } from "domain/InfoApp/InfoApp"
import { useDispatch, useSelector } from "react-redux"
import { errors, loading, systemMessages } from "ui/redux/slices/system/system.selectors"
import { clean, pushError, setLoading, pushInfo } from "ui/redux/slices/system/system.slice"
import { AppDispatch } from "ui/redux/store"

export const useSystem = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const loadingState:boolean = useSelector(loading)
  const errorsApp:ErrorApp[] = useSelector(errors)
  const messages:InfoApp[] = useSelector(systemMessages)
  const setLoadingState:Function = (stateLoading:boolean) => dispatch(setLoading(stateLoading));
  const cleanMessagesApp:Function = () => dispatch(clean());
  const pushErrorsApp:Function = (err:ErrorApp) => dispatch(pushError(err));
  const pushInfoApp:Function = (err:ErrorApp) => dispatch(pushInfo(err));

  return {
    loadingState,
    errorsApp,
    messages,
    setLoadingState,
    cleanMessagesApp,
    pushErrorsApp,
    pushInfoApp
  }
}