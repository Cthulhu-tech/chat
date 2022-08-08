import { updateToken } from "../redux/store/jwt";
import { Action } from "../interface/redux";
import { Next } from "apply-middleware";
import jwt_decode from "jwt-decode";

let token = ''

export default ({dispatch}: any) => {

  return (next: Next) => (action: Action<string, any>) => {

    if(action.type === "delete_jwt")
      token = '';
    if(action.type === "update_jwt")
      token = action.payload.accessToken


    let decodedToken:any = jwt_decode(token);

    if (decodedToken.exp * 1000 < new Date().getTime()) {

      return fetch(process.env.REACT_APP_SERVER + 'refresh',
        {
          
          method: 'POST',
          mode: 'cors',
          credentials: 'include',
          headers: 
          {
      
              'Content-type': 'application/json'
          },

        }).then((response) => {

          return response.json();

        })
        .then((json) => {

            dispatch(updateToken({user: {

                login: json.login,
                jwt: json.accesstoken,
        
            }}));

          return next(action);

        });
    }
    
    return next(action);

  }

}