import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom"
import { userContext } from "../Context Api/userManagment";

export const Protected = ({role}) => {
    const {User}=useContext(userContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(!User||!User?.token){
            navigate(`/login/${role}`);
        }
    },[User,navigate]);
    return <>
        <Outlet />
    </>
}