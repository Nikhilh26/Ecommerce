import './App.css';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import About from './pages/About';
import Contact from './pages/Contact';
import Policy from './pages/Policy';
import PageNotFound from './pages/PageNotFound';
import Register from './pages/Auth/Register';
import Login from './pages/Auth/Login';
import Dashboard from './pages/user/Dashboard';
import PrivateRoute from './Routes/PrivateRoute';
import ForgotPassword from './pages/Auth/ForgotPassword';
import AdminRoutes from './Routes/AdminRoutes';
import AdminDashboard from './pages/admin/AdminDashboard';
import CreateCategory from './pages/admin/CreateCategory';
import CreateProduct from './pages/admin/CreateProduct';
import Users from './pages/admin/Users';
import Products from './pages/admin/Products';

function App() {
  return (
    <>
      <Routes>

        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<HomePage />} />

        <Route path='/dashboard' element={<PrivateRoute />} >

          <Route path='user' element={<Dashboard />} />

          <Route path='admin' element={<AdminRoutes />} >

            <Route path='' element={<AdminDashboard />} />
            <Route path='create-category' element={<CreateCategory />} />
            <Route path='create-product' element={<CreateProduct />} />
            <Route path='users' element={<Users />} />
            <Route path='product' element={<Products />} />

          </Route>

        </Route>

        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/*' element={<PageNotFound />} />

      </Routes>
    </>
  );
}

export default App;