import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000/");

export const Home = () => {

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

    },[]);

    const sendMessage = () => {

        socket.emit("message", "hello world, io!");

    }
    
    return <>
        <div onClick={sendMessage}>pong</div>
    </>

}