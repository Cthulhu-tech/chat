import { ReduxStore } from '../../../interface/redux';
import { useSelector } from 'react-redux';
import { Sing } from '../sing/sing';

export const Navigation = () => {

    const user = useSelector((store: ReduxStore) => store.jwt.user.login);
    
    return <nav>
        {user && <Sing/>}
    </nav>

}