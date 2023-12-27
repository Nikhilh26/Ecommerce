import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import AdminMenu from '../../components/AdminMenu'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import CategoryForm from '../../components/Form/CategoryForm';
import { useAuth } from '../../Context/auth';
import { Modal } from 'antd';

export default function CreateCategory() {

  const [categories, setcategories] = useState([]);
  const [name, setname] = useState('');
  const [auth] = useAuth();
  const [visible, setVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState(null);
  const [selected, setSelected] = useState('');
  const [selectedForDelete, setselectedForDelete] = useState(null);

  const handleOnSubmitEdit = async (e) => {
    e.preventDefault();
    console.log(selected._id);
    try {
      const { data } = await axios.put(`http://localhost:8000/api/v1/category/update-category/${selected._id}`,
        { name: updatedName },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`
          }
        })
      console.log(data);
      if (data.success) {
        toast.success('Update Succesfull');
        getAllCategories();
      } else {
        toast.error('Somethin Went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Occured')
    }
  }

  const handleOnClickDelete = async (e) => {
    e.preventDefault();
    console.log(selectedForDelete._id);
    try {
      const { data } =
        await axios.delete(`http://localhost:8000/api/v1/category/delete-category/${selectedForDelete._id}`,
          {
            headers: {
              Authorization: `Bearer ${auth.token}`
            }
          })

      console.log(data);

      if (data.success) {
        toast.success('Delete Succesfull');
        getAllCategories();
      } else {

        toast.error('Somethin Went wrong');
      }
    } catch (error) {
      console.log(error);
      toast.error('Error Occured')
    }
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('http://localhost:8000/api/v1/category/create-category', { name }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        },
      });


      if (data.success) {

        toast.success(`${data.category.name} created`);
        getAllCategories();

      } else {

        toast.success('Error in creating');

      }

    } catch (error) {

      console.log('Error');

      toast.error('Something went Wrong');

    }
  }

  const getAllCategories = async (req, res) => {

    try {
      const { data } = await axios.get('http://localhost:8000/api/v1/category/get-category');

      console.log(data);

      if (data.success) {
        setcategories(data.category);
      }

    } catch (error) {
      console.log("Error in frontEnd @src/pages/admin/CreateCategory.js");
      console.log(error);
      toast.error("Something went Wrong");
    }
  }

  useEffect(() => {
    getAllCategories();
  }, [])

  // container fluid why ?

  return (

    <Layout>

      <div className="container-fluid m-3 p-3 dashboard">

        <div className="row">

          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9">
            <h1>Manage Category</h1>

            <div className='p-3'>
              <CategoryForm
                setValue={setname}
                value={name}
                handleOnSubmit={handleOnSubmit} />
            </div>

            <div className="w-75">

              <table className="table">

                <thead>

                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {categories?.map((c) => (

                    <>
                      <tr>
                        <td key={c._id}>{c.name}</td>
                        <td>

                          <button className='btn btn-primary ms-2'
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(c.name);
                              setSelected(c);
                              console.log(c);
                            }}
                          >Edit </button>

                          <button className='btn btn-danger ms-2'
                            onClick={
                              (e) => { setselectedForDelete(c); handleOnClickDelete(e) }}
                          > Delete</button>

                        </td>
                      </tr>
                    </>

                  ))}

                </tbody>

              </table>

            </div>

          </div>


        </div>

      </div>
      <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
        <CategoryForm value={updatedName} setValue={setUpdatedName} handleOnSubmit={handleOnSubmitEdit} />
      </Modal>
      <ToastContainer />
    </Layout>
  )
}
