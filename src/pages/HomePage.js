import React from 'react'
import Layout from './../components/Layout'
import { useAuth } from '../Context/auth'

export default function HomePage() {
    const [auth, setauth] = useAuth();
    console.log(auth);
    return (
        <Layout title='Home Page'>
            <h1>HomePage</h1>
            <div>
                {auth.user && auth.user.name}
            </div>
        </Layout>
    )
}
