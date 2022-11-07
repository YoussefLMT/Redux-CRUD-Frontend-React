import React, { useEffect, useState } from 'react';
import axiosInstance from './axios'
import Swal from 'sweetalert2'
import { useDispatch } from 'react-redux';
import { getUsers } from './features/usersSlice';

function App() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    errors: [],
  })

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  const handleChange = (e) => {
    e.persist();
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const addNewUser = async (e) => {
    e.preventDefault()

    const data = {
      name: form.name,
      email: form.email,
      password: form.password
    }

    const response = await axiosInstance.post('/users', data)
    if (response.data.status === 200) {
      Toast.fire({
        icon: 'success',
        title: response.data.message
      })
    } else {
      setForm({ ...form, errors: response.data.validation_err });
    }
  }

  return (
    <div className="container mt-5">
      <h2 className='text-center'>Redux CRUD</h2>
      <div className="row mt-5">
        <div className="col-md-9 mx-auto">
          <div className="card">
            <div className="card-header">
              Users Managment

              {/* Button trigger add user modal */}
              <button type="button" className="btn btn-primary" style={{ float: 'right' }} data-bs-toggle="modal" data-bs-target="#addUserModal">
                Add User
              </button>
            </div>
            <div className="card-body">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal  */}
      <div className="modal fade" id="addUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Add New User</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={addNewUser}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input type="text" name='name' value={form.name} onChange={handleChange} className="form-control" id="name" />
                  <span className='text-danger'>{form.errors.name}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" name='email' value={form.email} onChange={handleChange} className="form-control" id="email" />
                  <span className='text-danger'>{form.errors.email}</span>
                </div>
                <div className="mb-3">
                  <label htmlFor="passowrd" className="form-label">Password</label>
                  <input type="passowrd" name='password' value={form.password} onChange={handleChange} className="form-control" id="passowrd" />
                  <span className='text-danger'>{form.errors.password}</span>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="submit" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
