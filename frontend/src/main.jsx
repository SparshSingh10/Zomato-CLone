import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from "react-router-dom"
import Page from './component/Page'
import Login from './component/Login'
import AddLocationPage from "./component/AddPage"
import ViewPage from "./component/ViewPage"
import EditPage from "./component/EditPage"
import Profile from "./component/Profile"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <BrowserRouter>
     <Routes>
        <Route path="/" element={<Page/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/addPage" element={<AddLocationPage />}></Route>
        <Route path="/page/:id" element={<ViewPage/>}></Route>
        <Route path="/edit/:id/edit" element={<EditPage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes >
    </BrowserRouter>
  </React.StrictMode>,
)
