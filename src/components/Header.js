import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../Context/auth'
import { useNavigate } from 'react-router-dom';
//import { toast, ToastContainer } from 'react-toastify';

export default function Header() {
    const [auth, setauth] = useAuth();
    const navigate = useNavigate();

    const handlelogout = () => {


        localStorage.removeItem('auth');
        //        toast.error("Logged Out Succesfully");

        setTimeout(() => {
        }, 2000);

        setauth({
            ...auth,
            user: null,
            token: ''
        })

        navigate('/');
    }

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary">

                <div class="container-fluid">
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <Link to="/" className="navbar-brand" href="#"> 🛒 Ecommerce</Link>

                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">

                            <li class="nav-item">
                                <NavLink to="/home" className="nav-link" aria-current="page" href="#">Home</NavLink>
                            </li>

                            {!auth.user ?
                                <>

                                    <li class="nav-item">
                                        <NavLink to="/register" className="nav-link" href="#"> Register </NavLink>
                                    </li>

                                    <li class="nav-item">
                                        <NavLink to="/login" className="nav-link" href="#">Login</NavLink>
                                    </li>

                                </>
                                :
                                <div class="dropdown">

                                    <NavLink className="btn dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                        {auth.user.name}
                                    </NavLink>

                                    <ul class="dropdown-menu">

                                        <li>
                                            <Link to="/" onClick={handlelogout} className="dropdown-item" >
                                                LogOut
                                            </Link>
                                        </li>

                                        <li>


                                            <Link to={`/dashboard/${auth.user.role === 1 ? 'admin' : 'user'}`}
                                                className="dropdown-item"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>

                                    </ul>

                                </div>
                            }


                            <li class="nav-item">
                                <NavLink to="/cart" className="nav-link" href="#">Cart(0)</NavLink>
                            </li>

                            <li class="nav-item">
                                <NavLink to="/category" className="nav-link" href="#">Category</NavLink>
                            </li>

                            {/* <li class="nav-item dropdown">
                                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Dropdown
                                </NavLink>
                                <ul class="dropdown-menu">
                                    <li><NavLink className="dropdown-item" href="#">Action</NavLink></li>
                                    <li><NavLink className="dropdown-item" href="#">Another action</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><NavLink className="dropdown-item" href="#">Something else here</NavLink></li>
                                </ul>
                            </li> */}

                            {/* <li class="nav-item">
                                <NavLink className="nav-link disabled" aria-disabled="true">Disabled</NavLink>
                            </li> */}

                        </ul>

                        {/* <form class="d-flex" role="search">
                            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button class="btn btn-outline-success" type="submit">Search</button>
                        </form> */}

                    </div>
                </div>
                {/* <ToastContainer /> */}
            </nav>
        </>
    )
}
