import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const HomePageContext=createContext();

export const HomePageDataProvider=({children})=>{
    const [HomePageData,setHomePageData]=useState([]);

    useEffect(()=>{
        const fetchalldata=async()=>{
            try {
                const response = await axios.get('http://localhost:3000');
                setHomePageData(response.data.Homepageproduct);
            } catch (error) {
                console.error("Error fetching data:", error);
            } 
        }
        fetchalldata();
    },[])

    return <HomePageContext.Provider value={{HomePageData,setHomePageData}}>
        {children}
    </HomePageContext.Provider>
}