import { toggleNavigation } from '../../../redux/store/navigation';
import { ReduxStore } from '../../../interface/redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Sing } from '../sing/sing';
import './navigation.scss';

export const Navigation = () => {

    const dispatch = useDispatch();
    const active = useSelector((store: ReduxStore) => store.navigation.open);

    const handlerNavigation = () => dispatch(toggleNavigation(!active));

    const user = useSelector((store: ReduxStore) => store.jwt.user.login);
    
    return <nav className="navigation shadow-bottom">
        <div className="navigation-handler-container" onClick={handlerNavigation}>
            <div className="navigation-handler"/>
        </div>
        {user && <Sing/>}
    </nav>

}