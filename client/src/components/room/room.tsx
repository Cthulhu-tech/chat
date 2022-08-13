import { Room } from "../../interface/redux";
import { NavLink } from "react-router-dom";
import './room.scss';

export const RoomContainer = (room: Room) => {

    return <NavLink className="description container-room text" to={`/room/${room.id}`}>
        <div className="container-img"></div>
        {room.name}
    </NavLink>


}