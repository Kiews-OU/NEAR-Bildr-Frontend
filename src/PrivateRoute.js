import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";

axios.defaults.withCredentials = true;

function PrivateRoute({ children, ...rest }) {
    let [isAuth, setIsAuth] = useState(true)
    useEffect(() => {
        if (localStorage.getItem("token"))
            axios({
                method: 'post',
                url: 'http://localhost:7000/api/auth/generate-access-token',
            }).then((res) => {
                setIsAuth(true)
                return localStorage.setItem("token", res.data?.data?.token?.value)
            });
        else {
            return setIsAuth(false)
        }
    }, [])

    return (
        <Route
            {...rest}
            render={() => {
                return isAuth === true ? (
                    children
                ) : (
                    <Redirect to="/login" />
                );
            }}
        />
    );
}

export default PrivateRoute