import { Outlet } from "react-router-dom";
import { Nav } from "./components/nav";
import { Toaster } from 'react-hot-toast'
export const OwnerDeshbord = () => {

    const navdata = {
        pagetype: 'owner',
        homelink: '/owner',
        loginlink: '/owner/login',
        menulink: '/owner/menuitem'
    }

    return <>
        <Toaster position="top-right" reverseOrder={false} />

        <Nav navdata={navdata} />
        <Outlet />
    </>
}