import { updateToken } from '../../../redux/store/jwt';
import { ReduxStore } from '../../../interface/redux';
import { useFetch } from '../../../context/hook/useFetch';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const Sing = () => {

    const dispatch = useDispatch();
    const user = useSelector((store: ReduxStore) => store.jwt.user.login);

    const {load, data, error, FetchData} = useFetch('POST');

    const Lagout = () =>  FetchData('lagout');

    

    useEffect(() => {

        if(data){

            dispatch(updateToken({user: {

                login: null,
                jwt: null,
        
            }}));

        }

    }, [load]);

    return <>
        <p>{"user: " + user}</p>
        <p onClick={Lagout}>lagout</p>
    </>

}