import { joinMsg, updateMsg } from "../../redux/store/allMessage";
import { Msg, ReduxStore } from "../../interface/redux";
import { userMessage } from "../../redux/store/message";
import { SocketContext } from "../../context/socket";
import { useContext, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { Message } from "../input/message";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import './msgContent.scss';

import send from '../../assets/message/send.png';

export const MsgContent = () => {

    const {id} = useParams();
    const dispatch = useDispatch();
    const socket = useContext(SocketContext);
    const refMsg = useRef<HTMLDivElement>(null);
    const msg = useSelector((store: ReduxStore) => store.allMsg.msg);
    const userMsg = useSelector((store: ReduxStore) => store.userMsg.msg);
    const userName = useSelector((store: ReduxStore) => store.jwt.user.login);

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

    const scrollMessage = () => refMsg.current && refMsg.current.scrollIntoView({ behavior: "smooth" });

    useEffect(() => {}, [id, msg, userMsg]);

    useEffect(() => {scrollMessage();}, [msg]);

    return <div className="msg">
        <div className="container-message">
            {msg.map((msg) => {

                return <div key={msg.id} className="message">
                    <div className={msg.user === userName ? "container-message-data shadow-bottom user" : "container-message-data shadow-bottom companion"}>
                        <p className="text">{msg.msg ? msg.msg : 'Оповещение'}</p>
                        {msg.user !== userName && <p className="text msg-user">{msg.user}</p>}
                    </div>
                </div>

            })}
            <div ref={refMsg}/>
        </div>
        <div className="container-input">
            <div className="sub-container-input">
                <Message/>
                <button className="btn btn-message" onClick={newMessage}>
                    <img src={send} alt="send" className="img-send" />
                </button>
            </div>
        </div>
    </div>

}