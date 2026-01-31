import { Outlet } from "react-router-dom"
import { Nav } from "./components/nav"
import { Footer } from "./components/footer"
import { Whatsapp } from "./components/whatsapp"

function App() {

  const navdata={
    pagetype:'client',
    homelink:'/',
    loginlink:`login/${'user'}`,
    menulink:'/menu'
  }

  return (
    <>
      <div className="bg-gray-50">
        <Nav navdata={navdata} />
        <Outlet />
        <Footer/>
      </div>

    </>
  )
}

export default App
