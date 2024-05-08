import { Route, Routes } from "react-router-dom"
import Page from './component/Page'
import Login from './component/Login'
import AddLocationPage from "./component/AddPage"
import ViewPage from "./component/ViewPage"
import EditPage from "./component/EditPage"
import Profile from "./component/Profile"
function App() {

  return (
    <div>
      {/* <Routes>
        <Route path="/" element={<Page/>}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/addPage" element={<AddLocationPage />}></Route>
        <Route path="/page/:id" element={<ViewPage/>}></Route>
        <Route path="/edit/:id/edit" element={<EditPage/>}></Route>
        <Route path="/profile" element={<Profile/>}></Route>
      </Routes > */}
    </div >
  )
}

export default App
