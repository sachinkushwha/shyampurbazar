import { Outlet } from "react-router-dom"
import { Nav } from "./components/nav"
import { Footer } from "./components/footer";
import { Toaster } from 'react-hot-toast'
function App() {

  const navdata = {
    pagetype: 'client',
    homelink: '/',
    loginlink: `login/${'user'}`,
    menulink: '/menu'
  }

  return (
    <>
      <div className="bg-gray-50">
        <Toaster position="top-right" reverseOrder={false} />

        <Nav navdata={navdata} />
        <Outlet />
        <Footer />
      </div>
    </>
  )
}

export default App
