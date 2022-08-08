import { Navigate, useLocation, Outlet } from 'react-router';
import { updateToken } from "../../redux/store/jwt";
import { useFetch } from '../../hook/useFetch';
import { Loading } from '../loading/loading';
import { useDispatch } from "react-redux";
import { Error } from '../error/error';
import { useEffect } from "react";

export const CheckCookie = () => {

    const dispatch = useDispatch();
    const location = useLocation();

    const {load, data, error, FetchData} = useFetch('POST');

    useEffect(() => { FetchData('refresh'); },[]);
    useEffect(() => { 

        if(data && !error) {

            dispatch(updateToken({user: {

                login: data.login,
                jwt: data.accesstoken,
        
            }}));

        }

     }, [data, load]);

    if(load) return <Loading/>
    if(error) return <Error error={error}/>
    if(location.pathname !== '/login' && location.pathname !== '/registration') return <Navigate to="/login" replace={true} />

    return <Outlet/>

}