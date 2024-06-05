import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const LogoutAuth = () => {

    const userToken = useSelector(state=>state.user.userToken)

    return (
        userToken ? < Navigate to='/' /> : <Outlet />
    )
}

export default LogoutAuth
