import { Room } from "../../interface/redux";
import { NavLink } from "react-router-dom";

export const RoomContainer = (room: Room) => {

    return <section>
        <p>Комната: 
            <NavLink to={`/room/${room.id}`}>
                {room.name}
            </NavLink>
        </p>
        <p>Id комнаты: {room.id}</p>
        <p>создатель: {room.user}</p>
    </section>

}