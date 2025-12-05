import {createBrowserRouter} from "react-router-dom";
import Home from "@/pages/Home/index";
import CreateProduct from "@/pages/create-product";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import AuthLayout from "@/layouts/auth-layout";
import MainLayout from "@/layouts/main-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import NotFoundPage from "@/pages/NotFoundPage";

const router = createBrowserRouter([
  {
    element: <AuthLayout/>,
    children: [
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/register",
        element: <Register/>  
      
      },
    ]
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        element: <MainLayout/>,
        children: [
          {
        path: "/",
        element: <Home/>,
        },
        {
          path: "/create-product",
          element: <CreateProduct/>
        }
    ]

  },
]
},
{
 path: "*",
 element: <NotFoundPage/>,
}

]);
export default router;