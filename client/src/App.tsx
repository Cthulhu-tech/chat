import { ProtectedRouter } from './components/protected/protected';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration } from './page/registration/registration';
import { SocketConnection } from './components/socket/socket';
import { Layout } from './components/layout/layout';
import { Login } from './page/login/login';
import { Home } from "./page/home/home";
import { Room } from './page/room/room';
import './style/global.scss';

export const App = () => {

  return <BrowserRouter>
          <Routes>
          <Route element={<Layout/>}>
            <Route element={<ProtectedRouter/>}>
              <Route element={<SocketConnection/>}>
                <Route path="/" element={<Home/>}>
                  <Route path="/room/:id" element={<Room />}/>
                </Route>
              </Route>
              <Route path="/login" element={<Login />}/>
              <Route path="/registration" element={<Registration />}/>
            </Route>
          </Route>
        </Routes>
        </BrowserRouter>

}
