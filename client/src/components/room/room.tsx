import { ReduxStore, Room } from "../../interface/redux";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import './room.scss';

export const RoomContainer = (room: Room) => {

    const active = useSelector((store: ReduxStore) => store.navigation.open);

    return <NavLink className="description container-room text" to={`/room/${room.id}`}>
        <div className="container-img"></div>
        {active && room.name}
    </NavLink>


}