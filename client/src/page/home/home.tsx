import { RoomContainer } from "../../components/room/room";
import { ReduxStore } from "../../interface/redux";
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import './home.scss';

export const Home = () => {
    
    const store = useSelector((store: ReduxStore) => store.room.room);
    const user = useSelector((store: ReduxStore) => store.jwt.user);
    
    return <>
    <aside className="aside shadow-rigth">
        <div className="container-user">
            <div className="container-img user-img"></div>
            <p className="text title description">{user.login}</p>
        </div>
        <p className="text title description">All</p>
        {store && store.map(room =>{

            return <RoomContainer key={room.id} {...room}/>

        })}
    </aside>
    <main className="main">
        <Outlet/>
    </main>
    </>

}