import { ReduxStore } from '../../../interface/redux';
import { useSelector } from 'react-redux';
import { Sing } from '../sing/sing';
import './navigation.scss';

export const Navigation = () => {

    const handlerNavigation = () => {};

    const user = useSelector((store: ReduxStore) => store.jwt.user.login);
    
    return <nav className="navigation shadow-bottom">
        <div className="navigation-handler" onClick={handlerNavigation}/>
        {user && <Sing/>}
    </nav>

}