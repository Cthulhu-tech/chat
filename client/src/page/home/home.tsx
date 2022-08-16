import { RoomContainer } from "../../components/room/room";
import { ReduxStore } from "../../interface/redux";
import { useSelector } from 'react-redux';
import { Outlet } from "react-router-dom";
import './home.scss';

export const Home = () => {
    
    const user = useSelector((store: ReduxStore) => store.jwt.user);
    const store = useSelector((store: ReduxStore) => store.room.room);
    const active = useSelector((store: ReduxStore) => store.navigation.open);
    
    return <>
    <aside className="aside">
        <div className="container-user">
            <div className="container-img user-img"></div>
            {active && <p className="text title description">{user.login}</p>}
        </div>
        <div className="wrapper-all">
            {active && <p className="text title description">All</p>}
            {store && store.map(room =>{

                return <RoomContainer key={room.id} {...room}/>

            })}
        </div>
    </aside>
    <main className="main">
        <Outlet/>
    </main>
    </>

}