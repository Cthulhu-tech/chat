import { MsgContent } from "../../components/msgContent/msgContent";
import { Message } from "../../components/input/message";
import { SocketContext } from "../../context/socket";
import { ReduxStore } from "../../interface/redux";
import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

export const Room = () => {

    const {id} = useParams();
    const socket = useContext(SocketContext);
    const msg = useSelector((store: ReduxStore) => store.userMsg.msg);
    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    const newMessage = () => {
        
            console.log(socket)
        socket.emit('room_message', {id, msg});}

    useEffect(() => {},[msg]);

    useEffect(() => {

        socket.emit('join', id);

        return () => {

            socket.emit('leave', id);

        };

    },[socket, jwt]);


    return <section>
        <MsgContent/>
        <div>
            <Message/>
            <button onClick={newMessage}>send message</button>
        </div>
    </section>

}
