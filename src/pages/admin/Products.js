import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/AdminMenu'
import Layout from '../../components/Layout'
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

export default function Products() {
    const [products, setProducts] = useState([]);

    const getAllProducts = async (e) => {

        //e.preventDefault();

        try {

            const { data } = await axios('http://localhost:8000/api/v2/get-products');

            console.log(data);
            if (data.success) {
                setProducts(data.products);
                toast.success('Products Fetched Succesfully');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }
    }

    useEffect(() => {
        getAllProducts();
    }, []);

    return (
        <Layout>

            <div>

                <div className='row'>

                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>

                    <div className='col-md-9'>

                        <h1 className='text-center'>All Product list</h1>

                        <div className='d-flex'>
                            {products.length > 0 && products.map((e) =>

                                <div className="card m-2" style={{ 'width': '18rem' }} key={e._id}>
                                    <img className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="card-title">{e.name}</h5>
                                        <p className="card-text">{e.description}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                </div>

            </div>
            <ToastContainer />
        </Layout>
    )
}
