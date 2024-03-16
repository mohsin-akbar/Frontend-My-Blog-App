import { Navigate, Outlet } from "react-router-dom";
import { isLoggedIn } from "../components/authentication/securityauth";

export const PrivateRouting=()=>{
  

   if(isLoggedIn()){
     return <Outlet/>
   }else{
   return <Navigate to={'/signin'}/>
   }

}