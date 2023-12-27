import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPw] = useState("");
    const [address, setAdd] = useState("");
    const [phone, setContact] = useState("");
    const [question, setquestion] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:8000/api/register',
                { name, email, password, address, phone, question });
            console.log(res);

            if (res.data.success === 'false') {
                toast.error(res.data.message);
            } else {
                toast.success('Register Successfully'); // Show toast message after successful form submission
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

                            <h1>Register Page</h1>

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
                                        placeholder='Name'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)} />

                                </div>

                                <div class="mb-3">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder='Address'
                                        value={address}
                                        onChange={(e) => setAdd(e.target.value)} />

                                </div>

                                <div class="mb-3">

                                    <input
                                        type="text"
                                        class="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder='Contact'
                                        value={phone}
                                        onChange={(e) => setContact(e.target.value)} />

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

// import React from 'react';

// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function Register() {
//     const notify = () => toast("Wow so easy!");

//     return (
//         <div>
//             <button onClick={notify}>Notify!</button>
//             <ToastContainer />
//         </div>
//     );
// }