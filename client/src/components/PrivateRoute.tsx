import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/user.context';
import { ReactNode } from 'react';

const PrivateRoute = ({children}: {children: ReactNode}) => {
    const { user, loggedIn } = useUserContext();


    if(user.role === 'User' && loggedIn){
        return children;
    }else{
        return <Navigate to="/" />;
    }
 
};

export default PrivateRoute;