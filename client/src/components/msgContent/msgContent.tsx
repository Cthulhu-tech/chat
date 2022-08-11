import { joinMsg, updateMsg } from "../../redux/store/allMessage";
import { Msg, ReduxStore } from "../../interface/redux";
import { SocketContext } from "../../context/socket";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const MsgContent = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const msg = useSelector((store: ReduxStore) => store.allMsg.msg);

    useEffect(() => {},[msg]);

    useEffect(() => {socket.emit('allData_message', id)},[id]);

    useEffect(() => {

        socket.on('allData_message', (msg: Msg[]) => dispatch(joinMsg(msg)));
        socket.on('new_message_in_room', (msg:Msg) => dispatch(updateMsg([msg])));

        return () => {

            socket.removeListener('allData_message');
            socket.removeListener('new_message_in_room');

        };

    },[]);

    return <div>
        {msg.map((msg) => {

            return <div key={msg.id}>
                <p>user: {msg.user}</p>
                <span>{msg.msg}</span>
            </div>

        })}
    </div>

}