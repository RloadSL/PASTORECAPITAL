/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserLogged } from "ui/redux/slices/authentication/authentication.selectors";

export const moduleGuard = (roleLevel:number): string[]=>{
  
  switch (roleLevel) {
    case 0: //Invitado
      return ['home', 'news'];
    case 1: //Pago 1
      return ['home', 'news'];
    case 2:// Pago 2
      return ['home', 'news'];
    case 3://Pago 3
      return ['home', 'news'];
    case 4://Administradores
      return ['home', 'news'];
    default://Invitado
      return ['home'];
  }
}



const useModuleGuard = () => {
  const user = useSelector(getUserLogged)
  const fn = useCallback(() => {
    return moduleGuard(user?.role.level)
  }, [user])
}

export default useModuleGuard;