import { joinMsg, updateMsg } from "../../redux/store/allMessage";
import { Msg, ReduxStore } from "../../interface/redux";
import { userMessage } from "../../redux/store/message";
import { SocketContext } from "../../context/socket";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../input/message";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './msgContent.scss';

export const MsgContent = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const msg = useSelector((store: ReduxStore) => store.allMsg.msg);
    const userMsg = useSelector((store: ReduxStore) => store.userMsg.msg);

    useEffect(() => {socket.emit('allData_message', id)},[id]);

    useEffect(() => {

        socket.on('allData_message', (msg: Msg[]) => dispatch(joinMsg(msg)));
        socket.on('new_message_in_room', (msg:Msg) => dispatch(updateMsg([msg])));

        return () => {

            socket.removeListener('allData_message');
            socket.removeListener('new_message_in_room');

        };

    },[socket]);

    const newMessage = async () => {

        if(id){
            
            await socket.emit('room_message', {id, msg: userMsg});

            await dispatch(userMessage(''));

        }

    };

    useEffect(() => {}, [id, msg, userMsg])

    return <div className="msg">
        <div className="container-message">
            {msg.map((msg) => {

                return <div key={msg.id}>
                    <p>user: {msg.user}</p>
                    <span>{msg.msg}</span>
                </div>

            })}
        </div>
        <div className="container-input">
            <div>
                <Message/>
                <button onClick={newMessage}>send message</button>
            </div>
        </div>
    </div>

}