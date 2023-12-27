import React from 'react'
import Layout from '../../components/Layout'
import { useAuth } from '../../Context/auth'
import UsersMenu from './UserMenu';

export default function Dashboard() {
    const [auth] = useAuth();

    return (
        <Layout tile='user'>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UsersMenu />
                    </div>
                    <div className='col-md-3'>
                        <div className='card w-75 p-3'>
                            <h3>{auth.user.name}</h3>
                            <h3>{auth.user.email}</h3>
                            <h3>{auth.user.address}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
