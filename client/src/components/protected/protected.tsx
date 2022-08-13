import { Navigate, Outlet, useLocation } from "react-router-dom";
import { updateToken } from "../../redux/store/jwt";
import { ReduxStore } from "../../interface/redux";
import { Loading } from "../loading/loading";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Error } from "../error/error";

export const ProtectedRouter = () => {

    const dispatch = useDispatch();
    const location = useLocation();
  
    const [load, setLoad] = useState(true);
    const [error, setError] = useState<Error>();
    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    useEffect(() => {
        
        setLoad(true);

        if(!!!jwt)
            fetch(process.env.REACT_APP_SERVER + 'refresh', {
                method: 'POST',
                mode: 'cors',
                redirect: 'follow',
                credentials: "include",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
            })
            .then((response) => response.json())
            .then((json) => {

                dispatch(updateToken({user: {

                    login: json.login,
                    jwt: json.accesstoken,
            
                }}));

                setLoad(false);

            }).catch((err) => {

                setLoad(false);
                setError(err);

            })

    },[jwt]);

    if(error) return <Error error={error}/>

    if(load && !!!jwt) return <Loading/>

    if(jwt && (location.pathname === '/login' || location.pathname === '/registration')) return <Navigate to="/" replace={true} />

    if(!!!jwt && (location.pathname === '/login' || location.pathname === '/registration')) return <Outlet/>

    if(!!!jwt) return <Navigate to="/login" replace={true}/>

    return <Outlet/>

}
