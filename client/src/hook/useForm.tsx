import { formResponse, inputData } from "../../interface/input";
import { useState } from "react";

export const useForm = (url: string) => {

    const [data, setData] = useState<formResponse>();
    const [values, setValue] = useState<inputData>();

    const handlerForm = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        if(!!values && !!values.login && !!values.password)
            fetch(process.env.REACT_APP_SERVER + url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: "include",
                headers: {
                    'Content-type': 'application/json',
                    'Accept': 'application/json'
                },
                
                body: JSON.stringify(values)

            }).then((response) => {

                return response.json();

            }).then((json) => {

                setData({...data, error: ""});
                return setData(json);

            }).catch((err) => {

                setData({...data, message: ""});
                return setData(err);

            })
            else
                setData({...data, error: "fields are not filled"});
    }
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        
        const { name, value } = event.target;
        
        setValue({
          ...values,
          [name]: value,
        });

    };

    return { data, values, onChange, handlerForm };

}