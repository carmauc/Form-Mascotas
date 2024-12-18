import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Formulario from './pages/Formulario'
import Layout from './pages/Layout'
import Formulario2 from './pages/Formulario2'
import Formulario3 from './pages/Formulario3'
import Serologia from './pages/Serologia'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
			{
          path: '/internacional',
          element: <Formulario/>
			},
      {
        path: '/rabia',
        element: <Formulario2/>
    },
    {
      path: '/nacional',
      element: <Formulario3/>
  },
  {
    path: '/serologia',
    element: <Serologia/>
}
    ],
  },
 

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
   </React.StrictMode>,
)
