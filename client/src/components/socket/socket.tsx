import { socket, SocketContext } from "../../context/socket";
import { newRoomData } from "../../redux/store/allRoom";
import { deleteEmit, setEmit } from "../../redux/store/lastEmit";
import { updateToken } from "../../redux/store/jwt";
import { ReduxStore } from "../../interface/redux";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const SocketConnection = () => {

    const emit = useSelector((store:ReduxStore) => store.emit.emit);
    const jwt = useSelector((store:ReduxStore) => store.jwt.user.jwt);

    const dispatch = useDispatch();

    const update_jwt = (data:string[]) => {

        dispatch(setEmit(data));

        dispatch(updateToken({user: {

            login: null,
            jwt: null,
    
        }}));

    }

    useEffect(() => {

        socket.auth = {jwt};
        socket.connect();

        if(emit){

            socket.emit(emit[0], emit[1]);

            dispatch(deleteEmit());

        }

        socket.emit('allData_room');

        socket.on('update_jwt', update_jwt);
        socket.on('new_message', (msg:string) => console.log(msg));
        socket.on('delete_room', (msg:string) => console.log(msg));
        socket.on('delete_message', (msg:string) => console.log(msg));
        socket.on('update_room', () => socket.emit('data_room'));
        socket.on('update_message', () => socket.emit('data_message'));
        socket.on('allData_room', (msg:string) => dispatch(newRoomData(msg)));


        return () => {

            socket.close();

        };

    },[jwt]);

    return <SocketContext.Provider value={socket}>
        <Outlet/>
    </SocketContext.Provider>


}