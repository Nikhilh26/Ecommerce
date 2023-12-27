import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Select } from 'antd';
import { useAuth } from '../../Context/auth';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;

export default function CreateProduct() {

    const [categories, setcategories] = useState([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [shipping, setShipping] = useState('');
    const [photo, setPhoto] = useState('');
    const [category, setCategory] = useState("");
    const [auth] = useAuth();
    const navigate = useNavigate();

    const getAllCategories = async (req, res) => {
        console.log('handler');
        try {
            const { data } = await axios.get('http://localhost:8000/api/v1/category/get-category');

            console.log(data);

            if (data.success) {
                setcategories(data.category);
            }

        } catch (error) {
            console.log("Error in frontEnd @src/pages/admin/CreateProduct.js");
            console.log(error);
            toast.error("Something went Wrong");
        }
    }

    const handleCreate = async (e) => {

        e.preventDefault();
        try {
            const productData = new FormData();

            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            productData.append("shipping", shipping);

            console.log('handler Pressed');
            //console.log(productData);
            const { data } = await axios.post('http://localhost:8000/api/v2/create-product',
                productData,
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    }
                });

            console.log(data)

            if (data.success) {
                toast.success("Product Created Successfully");
                navigate("/dashboard/admin/products");
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log("Error");
            console.log(error);
            toast.error('Somethin went Wrong');
        }
    }

    useEffect(() => {
        getAllCategories();
    }, [])

    return (
        <Layout>

            <div className='row'>

                <div className='col-md-3'>
                    <AdminMenu />
                </div>

                <div className='col-md-9'>

                    <h1>Create Product</h1>

                    <div className='m-1 w-75'>

                        <Select bordered={false}
                            placeholder='Select a Category'
                            size='large'
                            showSearch
                            className='form-select mb-3'
                            onChange={(value) => { setCategory(value) }}
                        >

                            {categories.map((c) => {
                                return (<Option key={c._id} value={c.name}>
                                    {c.name}
                                </Option>)
                            })}

                        </Select>

                        <div className='mb-3'>

                            <label htmlFor='upload images' className='btn btn-outline-secondary'>
                                <input type='file' name='photo' accept='image/*'
                                    onChange={(e) => { setPhoto(e.target.files[0]) }} required />
                            </label>

                        </div>

                        <div className='mb-3'>
                            {photo && (
                                <div >
                                    <img src={URL.createObjectURL(photo)} alt='product-photo' height='200px' className='img img-responsive' required />
                                </div>
                            )}
                        </div>

                        <div className="mb-3">
                            <input
                                type="text"
                                value={name}
                                placeholder="write a name"
                                className="form-control"
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <textarea
                                type="text"
                                value={description}
                                placeholder="write a description"
                                className="form-control"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={price}
                                placeholder="write a Price"
                                className="form-control"
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <input
                                type="number"
                                value={quantity}
                                placeholder="write quantity"
                                className="form-control"
                                onChange={(e) => setQuantity(e.target.value)}
                                required
                            />
                        </div>

                        <div className="mb-3">
                            <Select
                                bordered={false}
                                placeholder="Select Shipping "
                                size="large"
                                showSearch
                                className="form-select mb-3"
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                            >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                        </div>

                        <div className="mb-3">
                            <button className="btn btn-primary" onClick={handleCreate}>
                                CREATE PRODUCT
                            </button>
                        </div>

                    </div>
                </div>

                <ToastContainer />
            </div>

        </Layout>
    )
}
