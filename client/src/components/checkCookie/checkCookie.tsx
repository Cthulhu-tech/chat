import { Navigate, useLocation, Outlet } from 'react-router';
import { useDispatch, useSelector } from "react-redux";
import { updateToken } from "../../redux/store/jwt";
import { ReduxStore } from '../../interface/redux';
import { useFetch } from '../../hook/useFetch';
import { Loading } from '../loading/loading';
import { Error } from '../error/error';
import { useEffect } from "react";

export const CheckCookie = () => {

    const dispatch = useDispatch();
    const location = useLocation();
    const jwt = useSelector((state:ReduxStore) => state.jwt.user.jwt);

    const {load, data, error, FetchData} = useFetch('POST');

    useEffect(() => { FetchData('refresh'); },[]);
    useEffect(() => { 
        
        if(data && !error) {

            dispatch(updateToken({user: {

                login: data.login,
                jwt: data.accesstoken,
        
            }}));

        }

     }, [load]);

    if(load) return <Loading/>
    if(error) return <Error error={error}/>
    if((location.pathname !== '/login' && location.pathname !== '/registration') && jwt === null) return <Navigate to="/login" replace={true} />
     
    return <Outlet/>

}