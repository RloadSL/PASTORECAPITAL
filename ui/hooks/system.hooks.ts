import { ErrorApp } from "domain/ErrorApp/ErrorApp"
import { useDispatch, useSelector } from "react-redux"
import { errors, loading } from "ui/redux/slices/system/system.selectors"
import { cleanErrors, pushError, setLoading } from "ui/redux/slices/system/system.slice"
import { AppDispatch } from "ui/redux/store"

export const useSystem = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const loadingState:boolean = useSelector(loading)
  const errorsApp:ErrorApp[] = useSelector(errors)

  const setLoadingState:Function = (stateLoading:boolean) => dispatch(setLoading(stateLoading));
  const cleanErrorsApp:Function = () => dispatch(cleanErrors());
  const pushErrorsApp:Function = (err:ErrorApp) => dispatch(pushError(err));


  return {
    loadingState,
    errorsApp,
    setLoadingState,
    cleanErrorsApp,
    pushErrorsApp
  }
}