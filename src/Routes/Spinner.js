import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export default function Spinner({ path = 'login' }) {
    const [seconds, setSeconds] = useState(5);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {

        const interval = setInterval(() => {
            setSeconds(seconds - 1);
        }, 1000)

        if (seconds === 0)
            navigate(`/${path}`, { state: location.pathname, });

        return () => clearInterval(interval);
    }, [seconds, path])

    return (
        <>
            <div className="d-flex justify-content-center align-items-center flex-column" style={{ "height": "100vh" }}>
                <span>Redirecting in ......{seconds} seconds</span>
                <div className="spinner-grow" role="status">
                </div>
            </div>
        </>
    )
}
