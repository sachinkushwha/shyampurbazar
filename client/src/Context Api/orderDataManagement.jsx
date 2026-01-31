import { createContext, useState,useEffect, useContext } from "react";
import axios from "axios";
import { userContext } from "./userManagment";

export const OrderDataContext=createContext();

export const OrderDataProvider=({children})=>{
const {User}=useContext(userContext);
    const [OrderHistoryData,setOrderHistoryData]=useState([]);

    
    

    return( <OrderDataContext.Provider value={{OrderHistoryData,setOrderHistoryData}}>
        {children}
    </OrderDataContext.Provider>)
}