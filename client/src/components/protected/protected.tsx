import { Navigate, Outlet, useLocation } from "react-router";
import { CheckCookie } from "../checkCookie/checkCookie";
import { ReduxStore } from "../../interface/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const ProtectedRouter = () => {

    const location = useLocation();
    const [locationPath, setLocation] = useState('/login');
    const jwt = useSelector((state:ReduxStore) => state.jwt.user.jwt);

    useEffect(() => {

        setLocation(location.pathname === '/login' || location.pathname === '/registration' ? '/' : location.pathname);

    },[]);

    if(jwt === null) return <CheckCookie />
    
    if((location.pathname === '/login' || location.pathname === '/registration') && jwt) return <Navigate to={locationPath} replace/>

    return <Outlet/>

}
