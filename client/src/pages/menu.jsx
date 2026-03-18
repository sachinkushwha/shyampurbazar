import { Categorie } from "../components/menuitems"
import { MenuHeader } from "../components/menu-header"
import {  PlaceOrderbtn } from "../components/placeorderbtn"

export const Menu=()=>{
    const headerdata=
        {
            title:"Our Products ",
            dis:"Choose from our wide selection of Products"
        }
    
    return <>
    <MenuHeader headerdata={headerdata}/>
    <Categorie/>
    <PlaceOrderbtn/>
    </>
}