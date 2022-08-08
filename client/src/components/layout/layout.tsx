import { Navigation } from "./navigation/navigation";
import { Footer } from "./footer/footer";
import { Outlet } from "react-router";

export const Layout = () => {

    return <>
    <Navigation/>
    <Outlet/>
    <Footer/>
    </>

}