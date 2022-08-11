import { userMessage } from '../../redux/store/message';
import { ReduxStore } from '../../interface/redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

export const Message = () => {

    const dispatch = useDispatch();
    
    const msg = useSelector((store: ReduxStore) => store.userMsg.msg);

    const msgHandler = (event: React.ChangeEvent<HTMLInputElement>) => dispatch(userMessage(event.target.value));

    useEffect(() => {},[msg]);

    return <input type="text" value={msg} name={msg} onChange={msgHandler}/>

}