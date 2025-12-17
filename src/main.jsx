import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Viewstory from './viewstory.jsx'
import Reel from './reel.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools' // ✅ FIXED IMPORT
import Profile from './profile.jsx'
const client = new QueryClient()

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/story/:id", element: <Viewstory /> },
  { path: "/reels", element: <Reel /> },
  {path:"/profile",element:<Profile/>}
])

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
