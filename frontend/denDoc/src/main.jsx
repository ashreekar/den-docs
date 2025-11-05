import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import SignUp from './components/LoginAndSignUp/SignUp.jsx'
import Login from './components/LoginAndSignUp/Login.jsx'
import BlogDetails from './components/Blog/BlogDetails.jsx'
import Blogs from './components/Blog/Blogs.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"",
        element:<Blogs/>
      },
      {
        path:'/:id',
        element:<BlogDetails/>
      },
      {
        path:'/login',
        element:<Login/>
      },
      {
        path:'/signup',
        element:<SignUp/>
      },
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
