import React from 'react'

import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Formulario from './components/Formulario'
import Layout from './components/Layout'
import Formulario2 from './components/Formulario2'
import Formulario3 from './components/Formulario3'


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
  }
    ],
  },
 

])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
   </React.StrictMode>,
)
