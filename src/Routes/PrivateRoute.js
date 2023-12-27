import React, { useState, useEffect } from 'react';
import { useAuth } from '../Context/auth';
import { Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function PrivateRoute() {

    const [ok, setok] = useState(false);
    const [auth, setauth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const authcheck = async () => {

        console.log("Checking for bugs @PrivateRoutes.js");
        console.log(auth);

        const res = await axios.get("http://localhost:8000/api/user-auth",

            {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

        console.log(res.data);

        if (res.data.ok === true) {
            setok(true);
        } else {
            setok(false);
        }
    }

    if (auth.user && auth.token) authcheck();

    return ok ? <Outlet /> : <Spinner />;







    // function change() {

    //     // setTimeout(() => {

    //     //     if (!ok) {
    //     //         console.log("setTime out" + ok);
    //     //         navigate('/login', {
    //     //             state: location.pathname,
    //     //         });
    //     //     }

    //     // }, 2000);

    //     return (<h1>redirecting</h1>);
    // }
}