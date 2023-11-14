/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { createBrowserRouter } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import ManageLayout from '../layouts/ManageLayout'
import QuestionLayout from '../layouts/QuestionLayout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import NotFound from '../pages/NotFound'
import List from '../pages/manage/List'
import Trash from '../pages/manage/Trash'
import Star from '../pages/manage/Star'
import Edit from '../pages/question/Edit'
import Stat from '../pages/question/Stat'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout></MainLayout>,
    children: [
      { path: '/', element: <Home></Home> },
      { path: 'login', element: <Login></Login> },
      { path: 'register', element: <Register></Register> },
      {
        path: 'manage',
        element: <ManageLayout />,
        children: [
          { path: 'list', element: <List></List> },
          { path: 'star', element: <Star></Star> },
          { path: 'trash', element: <Trash></Trash> },
        ],
      },
      {
        path: 'question',
        element: <QuestionLayout></QuestionLayout>,
        children: [
          { path: 'edit/:id', element: <Edit></Edit> },
          { path: 'stat/:id', element: <Stat></Stat> },
        ],
      },
      { path: '*', element: <NotFound></NotFound> },
    ],
  },
])

export default router
export const HOME_PATHNAME = '/home'
export const LOGIN_PATHNAME = '/login'
export const REGISTER_PATHNAME = '/register'
export const MANAGE_INDEX_PATHNAME = '/manage/list'
