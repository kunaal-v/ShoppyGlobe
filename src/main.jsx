import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Body from './Components/Body.jsx'
import Error from './Components/Error.jsx'

import { lazy, Suspense } from 'react'
const Cart=lazy(()=>import("./Components/Cart.jsx"));
const Search=lazy(()=>import("./Components/Search.jsx"));
const ProductDetails=lazy(()=>import("./Components/ProductDetails.jsx"));
const appRouter=createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<Error/>,
    children:[
      {
        path:"/",
        element:<Body/>
      },
      {
        path:"/home",
        element:<Body/>
      },
      {
        path:"/product/:id",
        element:(<Suspense fallback={<h1>Loading</h1>}>
          <ProductDetails/>
        </Suspense>)
      },
      {
        path:"/cart",
        element:(<Suspense fallback={<h1>Loading</h1>}>
          <Cart/>
        </Suspense>)
      },
      {
        path:"/search",
        element:(<Suspense fallback={<h1>Loading</h1>}>
          <Search/>
        </Suspense>)
      }
    ]
  },
  {
    path:"/home",
    element:<App/>
  }
])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={appRouter}/>
)
