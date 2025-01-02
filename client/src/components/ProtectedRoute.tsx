
import { Navigate } from 'react-router-dom';

import { useUserContext } from '../context/user.context';

import { ReactNode } from 'react';

const ProtectedRoute = ({children}: {children: ReactNode}) => {
    const { user, loggedIn } = useUserContext();

    if(user.role === 'Admin'&& loggedIn){
        return children;
    }else{
        return <Navigate to="/" />;
    }
 
};

export default ProtectedRoute;