import { RoomContainer } from "../../components/room/room";
import { ReduxStore } from "../../interface/redux";
import { useSelector } from 'react-redux';

export const Home = () => {
    
    const store = useSelector((store: ReduxStore) => store.room.room);

    return <main>
    {store && store.map(room =>{

        return <RoomContainer key={room.id} {...room}/>

    })}
    </main>

}