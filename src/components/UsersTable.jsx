import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { store } from '../app/store';
import axiosInstance from '../axios';
import { getUsers } from '../features/usersSlice';

function UsersTable(props) {

    const [user, setUser] = useState({})
    const [errors, setErrors] = useState([]);

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

    const deleteUser = async (e, id) => {
        const deleteBtn = e.currentTarget;
        try {
            await axiosInstance.delete(`/users/${id}`)
            deleteBtn.closest('tr').remove();
        } catch (error) {
            console.log(error)
        }
    }

    const [id, setId] = useState(0)

    const getUser = async (id) => {
        setId(id)
        try {
            const response = await axiosInstance.get(`users/${id}`)
            setUser(response.data.user)
        } catch (error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        e.persist();
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const updateUser = async (e) => {
        e.preventDefault();
        const response = await axiosInstance.put(`users/${id}`, user)
        if (response.data.status === 200) {
            Toast.fire({
                icon: 'success',
                title: response.data.message
            })
            store.dispatch(getUsers())
        } else if (response.data.status === 422) {
            setErrors(response.data.validation_err)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
        <>
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
                    {
                        props.users.map((user) => {
                            return (
                                <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <button type="button" onClick={(e) => deleteUser(e, user.id)} class="btn btn-danger"><i class="fa-sharp fa-solid fa-trash"></i></button>
                                        <button type="button" style={{marginLeft: '10px'}} data-bs-toggle="modal" data-bs-target="#updateUserModal" onClick={() => getUser(user.id)} class="btn btn-warning"><i class="fa-sharp fa-solid fa-pen-to-square"></i></button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

            {/* update user modal */}
            <div className="modal fade" id="updateUserModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update User</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={updateUser}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name='name' value={user?.name || ''} onChange={handleChange} className="form-control" id="name" />
                                    <span className='text-danger'>{errors.name}</span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name='email' value={user?.email || ''} onChange={handleChange} className="form-control" id="email" />
                                    <span className='text-danger'>{errors.email}</span>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name='password' value={user?.passowrd} onChange={handleChange} className="form-control" id="password" />
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsersTable