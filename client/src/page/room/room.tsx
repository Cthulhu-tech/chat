import { SocketContext } from "../../context/socket";
import { useContext, useEffect } from 'react';
import { useParams } from "react-router-dom";

export const Room = () => {

    const {id} = useParams();

    const socket = useContext(SocketContext);

    useEffect(() => {

        const sendNewMessage = (msg: string) => {
            
            console.log(msg);
    
        }

        if(socket){

            socket.emit('join', id);

            socket.on('new_message_in_room', sendNewMessage);

        }

        return () => {

            if(socket){

                socket.removeAllListeners('new_message_in_room');
                socket.emit('leave', id);

            }

        };

    },[socket]);

    const newMessage = () => {

        socket && socket.emit('room_message', {id, msg:"message"},)

    }

    return <div onClick={newMessage}>room {id}</div>

}
