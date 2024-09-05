import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.tsx'
import NotesPage from './pages/NotesPage/NotesPage.tsx'
import TodosPage from './pages/TodosPage/TodosPage.tsx'

const basename = "/notes-app/";

const router = createBrowserRouter([
  {
    path: "/",
    element:<>
    <Navbar/>
    <Outlet/>
    </>,
    children:[
      {
        index: true,  
        element: <NotesPage/> 
      },
      {
        path: "notes",
        element: <NotesPage/>
      },
      {
        path: "todos",
        element: <TodosPage/>
      },
    ]
  }
], {basename: basename})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
