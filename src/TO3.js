import React, { useContext } from 'react'
import { Auth } from './TryOut'
export default function TO3() {
    const h = useContext(Auth);
    return (
        <div>TO3-{h}</div>
    )
}
