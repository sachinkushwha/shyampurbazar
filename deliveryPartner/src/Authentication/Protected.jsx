import { userAuth } from "../Hooks/userAuth";
import { Navigate, Outlet } from 'react-router-dom';
export const Protected = () => {
    const { data, isLoading } = userAuth();
    if (isLoading) return <h1>Loading...</h1>
    if (!data) return <Navigate to='/login' />
    return (
        <Outlet />
    )
}