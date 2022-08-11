import { SocketContext } from "../../context/socket";
import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

export const Room = () => {

    const {id} = useParams();

    const socket = useContext(SocketContext);

    const newMessage = () => socket.emit('room_message', {id, msg:"message"});

    useEffect(() => {

        const sendNewMessage = (msg: string) => {

            console.log(msg)
    
        }

        socket.emit('join', id);
        socket.on('new_message_in_room', sendNewMessage);

        return () => {

            socket.removeListener('new_message_in_room', sendNewMessage);
            socket.emit('leave', id);

        };

    },[]);

    return <div onClick={newMessage}>room {id}</div>

}
