import { PasswordInput } from "../../components/input/password";
import { Switch } from "../../switch/switch";
import { useForm } from "../../hook/useForm";
import { useEffect } from "react";

export const Registration = () => {
    
    const { data, values, onChange, handlerForm } = useForm("regist");

    useEffect(() => {},[values, data]);

    return <main>
        <section>
            <Switch/>
            <form onSubmit={handlerForm}>
                <div >
                    <input placeholder="login" type="text" onChange={onChange} value={values ? values.login : ""} name="login"/>
                    <PasswordInput value={values && values.password ? values.password : ""} onChange={onChange} />
                </div>
                <button type="submit">registration</button>
            </form>
            {data && data.message && <p>{data.message}</p>}
            {data && data.error && <p>{data.error}</p>}
        </section>
    </main>

}