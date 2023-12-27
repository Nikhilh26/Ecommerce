import React from 'react';
import Layout from '../../components/Layout';
import AdminMenu from '../../components/AdminMenu';
import { useAuth } from '../../Context/auth';

export default function AdminDashboard() {
    const [auth] = useAuth();

    return (
        <Layout >
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-50 p-5'>
                            <h3>{auth.user.name}</h3>
                            <h3>{auth.user.email}</h3>
                            <h3>{auth.user.phone}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
