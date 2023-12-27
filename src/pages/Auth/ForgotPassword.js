import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {

    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [question, setquestion] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8000/api/forgot-password',
                { email, newPassword: password, question });
            console.log(res);
            if (res.data.success === 'false') {
                toast.error(res.data.message);
            } else {
                toast.success('Password changed Successfully');
                // Show toast message after successful form submission
                setTimeout(() => {
                    navigate('/login');
                }, 1500);
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

                            <h1>Change Password</h1>

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

                                <div class="mb-3">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder='Favourite Animal'
                                        value={question}
                                        onChange={(e) => setquestion(e.target.value)} />

                                </div>

                                <button type="submit" class="btn btn-primary" onClick={handleSubmit}>Submit</button>

                            </form>

                        </div>

                        <ToastContainer />
                    </div>
                </div>
            </Layout>
        </>
    )
}