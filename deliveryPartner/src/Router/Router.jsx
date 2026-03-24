import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from '../pages/Home';
import { Protected } from '../Authentication/Protected';
import LoginPage from '../Authentication/Login';
import SignupPage from '../Authentication/Signup';
export const Router = () => {
    const router = new createBrowserRouter([
        {
            element: <Protected />, children: [
                {
                    path: '/', element: <Home />, children: [
                        {
                            index: true, element: <Home />
                        },

                    ]
                }
            ]
        }, 
        {
            path: 'login', element: <LoginPage />
        },
        {
            path: 'signup', element: <SignupPage />
        },

    ]);
    return <RouterProvider router={router} />
}