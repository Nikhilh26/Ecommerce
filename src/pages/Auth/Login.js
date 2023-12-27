import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

export default function Login() {

    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [auth, setauth] = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8000/api/login',
                { email, password });

            console.log(res.data);

            if (res.data.success === 'false') {
                toast.error(res.data.message);
            } else {

                toast.success('Login Successfully');

                const updatedAuth = {
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                };
                setauth(updatedAuth);
                localStorage.setItem('auth', JSON.stringify(updatedAuth));
                console.log(auth);

                // Show toast message after successful form submission

                setTimeout(() => {
                    navigate(location.state || '/');
                }, 2000);


            }

        } catch (error) {
            console.log('error');
            console.log(error);
        }

    }

    return (
        <>
            <Layout title='Register -Ecommerce'>
                <div className='Wrapper'>
                    <div className='Register-Dimensions'>
                        <div className='Register'>

                            <h1>Login Page</h1>

                            <form>

                                <div class="mb-3">

                                    <input
                                        type="email"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder='Email address'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)} />
                                </div>

                                <div class="mb-3">

                                    <input
                                        type="password"
                                        class="form-control"
                                        id="exampleInputPassword1"
                                        placeholder='Password'
                                        value={password}
                                        onChange={(e) => setPw(e.target.value)} />
                                </div>

                                <div className='distant-hori'>

                                    <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>

                                    <Link to='/forgot-password'>
                                        ForgotPassword
                                    </Link>

                                </div>
                            </form>
                        </div>
                        <ToastContainer />
                    </div>
                </div>
            </Layout>
        </>
    )
}
