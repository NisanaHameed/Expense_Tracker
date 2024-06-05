import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LogoutAuth from "../Authentication/LogoutAuth"
import LoginAuth from "../Authentication/LoginAuth"
import Login from "../Pages/Login"
import Signup from "../Pages/Signup"
import Home from "../Pages/Home"
import TransactionPage from "../Pages/TransactionPage"
import AddTransaction from "../Pages/AddTransaction"
import AddCategory from '../Pages/AddCategory';


const UserRoutes = () => {
    return (
            <Routes>
                <Route path="" element={<LoginAuth />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/transactions" element={<TransactionPage />} />
                    <Route path="/addTransaction" element={<AddTransaction />} />
                </Route>
                <Route path="" element={<LogoutAuth />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route path='/addCategory' element={<AddCategory />} />
            </Routes>
    )
}

export default UserRoutes
