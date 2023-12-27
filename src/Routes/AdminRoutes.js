import React, { useState } from 'react';
import { useAuth } from '../Context/auth';
import axios from 'axios';
import Spinner from './Spinner';
import { Outlet } from 'react-router-dom';

export default function AdminRoutes() {

    const [ok, setok] = useState(false);
    const [auth, setauth] = useAuth();

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

    return ok ? <Outlet /> : <Spinner path='' />;
}