import React, { useContext } from 'react'
import { Auth } from './TryOut'
import TO3 from './TO3';
export default function TryOut2() {
    const cnt = useContext(Auth);
    return (
        <>
            <div>TryOut2-{cnt}</div>
            <TO3 />
        </>
    )
}
