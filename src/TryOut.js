import React, { createContext, useState } from 'react'
import TryOut2 from './TryOut2';
const Auth = createContext();

export default function TryOut() {
    const [a, b] = useState(3000);
    return (
        <Auth.Provider value={a}>
            <TryOut2 />
        </Auth.Provider>
    )
}

export { Auth };
