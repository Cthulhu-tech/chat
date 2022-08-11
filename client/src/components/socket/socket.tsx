import { newRoomData } from "../../redux/store/allRoom";
import { SocketContext } from "../../context/socket";
import { ReduxStore } from "../../interface/redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import { useEffect } from "react";

export const SocketConnection = () => {

    const dispatch = useDispatch();

    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);
    
    const _Socket = io("http://localhost:4000",{auth: {jwt},transports: ['websocket'], upgrade: false});

    useEffect(() => {

        _Socket.emit('allData_room');

        _Socket.on('update_room', () => _Socket.emit('data_room'));
        _Socket.on('new_message', (msg:string) => console.log(msg));
        _Socket.on('delete_room', (msg:string) => console.log(msg));
        _Socket.on('delete_message', (msg:string) => console.log(msg));
        _Socket.on('update_message', () => _Socket.emit('data_message'));
        _Socket.on('allData_room', (msg:string) => dispatch(newRoomData(msg)));


        return () => {

            _Socket.close();

        };

    },[_Socket, jwt]);

    return <SocketContext.Provider value={_Socket}>
        <Outlet/>
    </SocketContext.Provider>


}