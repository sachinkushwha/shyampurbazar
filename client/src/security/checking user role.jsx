import { useContext, useEffect } from "react"
import { userContext } from "../Context Api/userManagment"
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export const CheckRole = () => {
    const navigate = useNavigate()
    const location = useLocation();
    const { User } = useContext(userContext);
    useEffect(() => {
        if (User?.role === 'user') {
            if (location.pathname.startsWith('/owner')) {
                navigate('/', { replace: true, state: { from: location } });
            }
        }
    }, [User, navigate])


    return <Outlet />
}