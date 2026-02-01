import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {QueryClient,QueryClientProvider} from '@tanstack/react-query'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { Menu } from './pages/menu.jsx'
import { ViewCart } from './components/view cart.jsx'
import { PlaceOrderbtn } from './components/placeorderbtn.jsx'
import { PlaceOrder } from './components/placeorder.jsx'
import { Login } from './security/login.jsx'
import { Protected } from './components/protected.jsx'
import { Signup } from './security/signup.jsx'
import { UserProvider } from './Context Api/userManagment.jsx'
import { OwnerDeshbord } from './OwnerDeshbordApp.jsx'
import { AddHomePageProduct } from './ownerComponents/addhomepageproduct.jsx'
import { HomeDeshbord } from './ownerComponents/homedeshbord.jsx'
import { PaymentMethod } from './components/paymentMode.jsx'
import { OrderHistory } from './components/orderHistory.jsx'
import { ViewOrder } from './components/view_order_data.jsx'
import { OrderDataProvider } from './Context Api/orderDataManagement.jsx'
import { AddingMenuItem } from './ownerComponents/adding menu item.jsx'
import { Homepageproducts } from './ownerComponents/home page product.jsx'
import { MenuItem } from './ownerComponents/menuItem.jsx';
import { OwnerOrders } from './ownerComponents/orderpage.jsx'
import { CheckRole } from './security/checking user role.jsx'

const queryClient=new QueryClient();

const router = createBrowserRouter([
  {
    element: <CheckRole />, children: [
      {
        element: <Protected role={'seller'} />, children: [
          {
            path: '/owner', element: <OwnerDeshbord />, children: [
              {
                index: true, element: <HomeDeshbord />
              },
              {
                path: '/owner/update/:id', element: <AddingMenuItem />
              },
              {
                path: '/owner/Home', element: <Homepageproducts />
              },
              {
                path: '/owner/Home/update/:id', element: <AddHomePageProduct />
              },
              {
                path: '/owner/addproduct', element: <AddHomePageProduct />
              },
              {
                path: '/owner/menuitem', element: <MenuItem />
              },
              {
                path: '/owner/orders', element: <OwnerOrders />
              },
              {
                path: '/owner/login', element: <Login role={'seller'} />
              },
              {
                path: '/owner/addmenuitem', element: <AddingMenuItem />
              }
            ]
          },
        ]
      },

      {
        path: '/', element: <App />, children: [
          {
            index: true, element: <Home />
          },

          {
            path: 'about', element: <About />
          },

          {
            path: 'menu', element: <Menu />
          },

          {
            path: 'about', element: <Menu />
          },

          {
            path: 'viewcart', element: <>
              <ViewCart />
              <PlaceOrderbtn />
            </>
          },

          {
            path: 'login/:role', element: <Login />
          },

          {
            path: 'signup/:role', element: <Signup />
          },

          {
            element: <Protected />, children: [
              {
                path: '/placeorder', element: <PlaceOrder />
              },
              {
                path: '/orderhistory', element: <OrderHistory />
              },
              {
                path: '/orderhistory/:id', element: <ViewOrder />
              },
              {
                path: '/payment', element: <PaymentMethod />
              }
            ]
          },

        ]
      }
    ]
  },
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <UserProvider>
      <OrderDataProvider>
        <RouterProvider router={router} />
      </OrderDataProvider>
    </UserProvider>
    </QueryClientProvider>
  </StrictMode>,
)
