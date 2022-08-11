import { PasswordInput } from "../../components/input/password";
import { updateToken } from "../../redux/store/jwt";
import { useForm } from "../../hook/useForm";
import { Switch } from "../../switch/switch";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export const Login = () => {
    
    const dispatch = useDispatch();
    const { data, values, onChange, handlerForm } = useForm("login");

    useEffect(() => {

        if(data?.auth && data.login && data.accesstoken)
            dispatch(updateToken({user: {

                login: data.login,
                jwt: data.accesstoken,
        
            }}));

    },[values, data]);

    return <main>
        <section >
            <Switch/>
            <form onSubmit={handlerForm}>
                <div>
                    <input placeholder="login" type="text" onChange={onChange} value={values ? values.login : ""} name="login"/>
                    <PasswordInput value={values && values.password ? values.password : ""} onChange={onChange} />
                </div>
                <button type="submit">login</button>
            </form>
            {data && data.message && <p>{data.message}</p>}
            {data && data.error && <p>{data.error}</p>}
        </section>
    </main>

}
