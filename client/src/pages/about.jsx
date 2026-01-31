import { MenuHeader } from "../components/menu-header"
import { Story } from "../components/ourstory"
import { Team } from "../components/ourTeam"
import { Whatsapp } from "../components/whatsapp"
import { Why } from "../components/whyChooseUs"

export const About=()=>{
    const headerdata=
        {
            title:"About Our Drinks Shop",
            dis:"Serving refreshing drinks since 2010"
        }
    return <>
    <MenuHeader headerdata={headerdata}/>
    <Story/>
    <Why/>
    <Team/>
    </>
}