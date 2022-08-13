import { MsgContent } from "../../components/msgContent/msgContent";
import { ErrorComponent } from "../../components/error/error";
import { useContext, useEffect, useState } from 'react';
import { SocketContext } from "../../context/socket";
import { ReduxStore } from "../../interface/redux";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './room.scss';

export const Room = () => {

    const [found, setFound] = useState(false);

    const {id} = useParams();
    const socket = useContext(SocketContext);
    const msg = useSelector((store: ReduxStore) => store.userMsg.msg);
    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    const Redirect = () => setFound(true);

    useEffect(() => {},[msg]);

    useEffect(() => {

        socket.emit('join', id);
        socket.on('room_not_found', Redirect);

        return () => {

            socket.off('room_not_found');
            socket.emit('leave', id);

        };

    },[socket, jwt, id]);

    if(found) return <ErrorComponent error={'Такой комнаты не существует'}/>

    return <section className="room-chat shadow-rigth">
        <MsgContent/>
    </section>

}
