import React from 'react'
import { RouterProvider } from 'react-router-dom'
import routerConfig from './router'
import 'yao-react-ui/dist/index.css'
import './app.css'

function App() {
  return <RouterProvider router={routerConfig}></RouterProvider>
}

export default App
