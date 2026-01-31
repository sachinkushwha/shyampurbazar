import { Categorie } from "../components/menuitems"
import { MenuHeader } from "../components/menu-header"
import {  PlaceOrderbtn } from "../components/placeorderbtn"
import { Whatsapp } from "../components/whatsapp"

export const Menu=()=>{
    const headerdata=
        {
            title:"Our Refreshing Menu",
            dis:"Choose from our wide selection of cold drinks"
        }
    
    return <>
    <MenuHeader headerdata={headerdata}/>
    <Categorie/>
    <PlaceOrderbtn/>
    </>
}