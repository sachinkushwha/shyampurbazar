
import { Navigate, Outlet, } from "react-router-dom";
import { useAuth } from "../hooks/auth";

export const Protected = () => {
    const { data, isLoading } = useAuth();
    if (isLoading) return <p>Loading...</p>
    if (!data) return <Navigate to='/login' />

    return <>
        <Outlet />
    </>
}