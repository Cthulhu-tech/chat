import { ReduxStore } from "../../interface/redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

export const Home = () => {

    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    const socket = io("http://localhost:4000",{auth: {jwt: jwt}});

    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        
        socket.on('connection', () => {
            
            setIsConnected(true);

        });

        socket.on('disconnect', () => {

            setIsConnected(false);

        });

        return () => {

            socket.off('connect');
            socket.off('disconnect');

        };

    },[jwt]);

    const sendMessage = () => {

        socket.emit('message', "hello!");

    }
    
    return <>
        <div onClick={sendMessage}>pong</div>
    </>

}