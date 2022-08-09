import { SocketContext } from "../../context/socket";
import { useContext, useEffect } from 'react';

export const Room = () => {

    const socket = useContext(SocketContext);

    useEffect(() => {

        if(socket){

            socket.emit('create', 'room')

        }

    },[])

    const newMessage = () => {

        socket && socket.emit('new_message_in_room', 'new message')

    }

    return <div onClick={newMessage}>room</div>

}
