import React, { useEffect, useState } from 'react';
import axiosInstance from './axios'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './features/usersSlice';
import UsersTable from './components/UsersTable';
import Pagination from './components/Pagination';

function App() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    errors: [],
  })
  const [currentPage, setCurrentPage] = useState(1)
  const [usersPerPage] = useState(5)

  const dispatch = useDispatch()

  const { users, loading } = useSelector((state) => state.users)

  const indexOfLastCar = currentPage * usersPerPage
  const indexOfFirstCar = indexOfLastCar - usersPerPage
  const currentUsers = users.slice(indexOfFirstCar, indexOfLastCar)

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
      dispatch(getUsers())
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
              <UsersTable users={currentUsers} />
              {loading && <h4 className='text-center'>Loading...</h4>}
              <Pagination usersPerPage={usersPerPage} totalUsers={users.length} paginate={number => setCurrentPage(number)}/>
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
