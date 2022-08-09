import { newRoomData } from "../../redux/store/all_room";
import { SocketContext } from "../../context/socket";
import { ReduxStore } from "../../interface/redux";
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";

export const SocketConnection = () => {

    const dispatch = useDispatch();
    const [socket, setSocket] = useState<Socket>();

    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    useEffect(() => {

        const socket = io("http://localhost:4000",{auth: {jwt: jwt}, transports: ['websocket'], upgrade: false});

        setSocket(socket);

        socket.emit('allData_room');

        socket.on('allData_room', (msg) => dispatch(newRoomData(msg)));

        socket.on('update_room', () => socket.emit('data_room'));
        socket.on('update_message', () => socket.emit('data_message'));

        socket.on('new_message', (msg) => console.log(msg));
        socket.on('delete_room', (msg) => console.log(msg));
        socket.on('delete_message', (msg) => console.log(msg));

        return () => {

            socket.close();

        };

    },[jwt, setSocket]);

    return <SocketContext.Provider value={socket ? socket : null}>
        <Outlet/>
    </SocketContext.Provider>


}