import { ProtectedRouter } from './components/protected/protected';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Registration } from './page/registration/registration';
import { Layout } from './components/layout/layout';
import { Login } from './page/login/login';
import { Home } from "./page/home/home";

export const App = () => {

  return <BrowserRouter>
  <Routes>
  <Route element={<Layout/>}>
    <Route element={<ProtectedRouter/>}>
      <Route path="/" element={<Home/>}>

      </Route>
      <Route path="/login" element={<Login />}/>
      <Route path="/registration" element={<Registration />}/>
    </Route>
  </Route>
</Routes>
</BrowserRouter>

}
