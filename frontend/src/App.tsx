import { Route, Routes } from "react-router-dom"
import Registration from "../src/components/pages/Registration"
import Homepage from "./components/pages/Homepage"
import Login from "./components/pages/Login"
import { ToastContainer } from "react-toastify"
import Createuser from "./components/admin/Createuser"


function App() {


  return (
    <>

      <Routes>
        <Route path="/" element={< Homepage />}></Route>
        <Route path="/register" element={<Registration />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/createuser" element={<Createuser />}></Route>
      </Routes>
      <ToastContainer></ToastContainer>
    </>
  )
}

export default App
