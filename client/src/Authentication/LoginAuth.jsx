import { useSelector } from "react-redux";
import { Navigate, Outlet } from 'react-router-dom'

const LoginAuth = () => {
    
   const userToken = useSelector(state=>state.user.userToken)
   
    return (
        userToken ? < Outlet /> : <Navigate to='/login' />
    )
}

export default LoginAuth;