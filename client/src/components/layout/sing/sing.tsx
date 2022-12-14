import { updateToken } from '../../../redux/store/jwt';
import { useFetch } from '../../../hook/useFetch';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export const Sing = () => {

    const dispatch = useDispatch();

    const {load, data, error, FetchData} = useFetch('POST');

    const Lagout = () =>  FetchData('lagout');

    useEffect(() => {

        if(data && !error){

            dispatch(updateToken({user: {

                login: null,
                jwt: null,
        
            }}));

        }

    }, [load]);

    return <div>
        <p className="text description title" onClick={Lagout}>lagout</p>
    </div>

}