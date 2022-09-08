/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserLogged } from "ui/redux/slices/authentication/authentication.selectors";

export const controlGuard = (roleLevel:number, route:string): boolean=>{
  switch (route) {
    case '/login/':
      return roleLevel <= 1;
    case '/home/':
      return roleLevel <= 0;
  
    default:
      return true;
  }
}

const useRouterGuard = () => {
  const router = useRouter()
  const user = useSelector(getUserLogged)
  
  useEffect(() => {
    const handleRouteChange = (url:string) => {
      if(!controlGuard(user.role.level, url) && router.route != url) router.push('/')
    }

    if(user) router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [user])
}

export default useRouterGuard;