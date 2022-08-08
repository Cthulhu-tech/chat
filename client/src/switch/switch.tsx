import { NavLink } from "react-router-dom";

export const Switch = () => {

    return  <div>
        <NavLink to="/login">login</NavLink>
        <NavLink to="/registration">registration</NavLink>
    </div>

}