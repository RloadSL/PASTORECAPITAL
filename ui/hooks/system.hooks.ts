import { ErrorApp } from "domain/ErrorApp/ErrorApp"
import { useDispatch, useSelector } from "react-redux"
import { errors, loading } from "ui/redux/slices/system/system.selectors"
import { cleanErrors, setLoading } from "ui/redux/slices/system/system.slice"
import { AppDispatch } from "ui/redux/store"

export const useSystem = ()=>{
  const dispatch = useDispatch<AppDispatch>()
  const loadingState:boolean = useSelector(loading)
  const errorsApp:ErrorApp[] = useSelector(errors)

  const setLoadingState:Function = () => dispatch(setLoading());
  const cleanErrorsApp:Function = () => dispatch(cleanErrors());

  return {
    loadingState,
    errorsApp,
    setLoadingState,
    cleanErrorsApp
  }
}