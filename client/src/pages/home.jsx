import { Hero } from "../components/hero"
import { Product } from "../components/products"
import { Whatsapp } from "../CommonUi/whatsapp"
import { useAuth } from "../hooks/auth"

export const Home = () => {
    const {data}=useAuth();
    return <>
        <Hero />
        <Product/>
        <Whatsapp/>
    </>
}