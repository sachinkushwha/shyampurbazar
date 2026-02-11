import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../Context Api/userManagment';
export const PlaceOrderbtn=()=>{
    const {User}=useContext(userContext);
     const [order,setorder]=useState(0);
    useEffect(()=>{
        const manageorder=()=>{
            let itemno=JSON.parse(localStorage.getItem(User?.username+'pepsicart'))||{}
            let countitem=Object.keys(itemno).length;
            setorder(countitem);
        }
        manageorder()
        window.addEventListener('changecartvalue',manageorder);
        return ()=>{
            window.removeEventListener('changecartvalue',manageorder);
        }
    },[])
    return<>
    {
            order>0?(<div className="fixed bottom-8 right-2 sm:bottom-15 sm:right-15 z-50">
            <Link to="/placeorder" className="py-3 px-3 font-medium text-white bg-blue-400 rounded hover:bg-blue-700 transition duration-300">Place Order ({order})</Link>
        </div>):('')
        }
    </>
}