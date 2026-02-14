import { createContext, useEffect, useState } from "react";
import axios from "axios";
export const menuContex=createContext();

export const MenuDataProvider=({children})=>{
    const [MenuData,setMenuData]=useState([]);

    useEffect(()=>{
        const fetchalldata = async () => {
            try {
                const response = await axios.get('http://localhost:3001/item/menuitem');
                console.log(response.data.itemdata);
                setMenuData(response.data.itemdata);
            } catch (error) {
                console.error("Error fetching menu items:", error);
            }
        }
        fetchalldata();
    },[]);
    return <menuContex.Provider value={{MenuData,setMenuData}}>
        {children}
    </menuContex.Provider>
}