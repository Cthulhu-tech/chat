import { SocketContext } from "../../context/socket";
import { ReduxStore } from "../../interface/redux";
import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

export const SocketConnection = () => {

    const [socket, setSocket] = useState<Socket>();

    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    useEffect(() => {

        const socket = io("http://localhost:4000",{auth: {jwt: jwt}, transports: ['websocket'], upgrade: false});

        setSocket(socket);

        return () => {

            socket.close();

        };

    },[jwt, setSocket]);
    
    return <SocketContext.Provider value={socket ? socket : null}>
        <Outlet/>
    </SocketContext.Provider>


}