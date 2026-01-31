import { createContext,useEffect,useState } from "react";


export const userContext=createContext()

export const UserProvider=({children})=>{
    const [item,setitem]=useState([]);
    const [User,setUser]=useState(JSON.parse(localStorage.getItem('pepsiUserLoginData')));
    useEffect(()=>{
        const userData=JSON.parse(localStorage.getItem('pepsiUserLoginData'));
        if(userData){
            setUser(userData);
        }
    },[])
    const logingUser=(userData)=>{
        setUser(userData);
        localStorage.setItem('pepsiUserLoginData',JSON.stringify(userData));
    }

    const logOutUser=()=>{
        localStorage.removeItem('pepsiUserLoginData');
        setUser(null);
    }

return(
    <userContext.Provider value={{logingUser,User,logOutUser,item,setitem}}>
        {children}
    </userContext.Provider>
);
};