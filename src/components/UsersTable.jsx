import React, { useEffect, useState } from 'react'
import axiosInstance from '../axios';

function UsersTable(props) {

    const [user, setUser] = useState({})

    const deleteUser = async (e, id) => {
        const deleteBtn = e.currentTarget;
        try {
            await axiosInstance.delete(`/users/${id}`)
            deleteBtn.closest('tr').remove();
        } catch (error) {
            console.log(error)
        }
    }

    const getUser = async (id) => {
        try {
            const response = await axiosInstance.get(`users/${id}`)
            setUser(response.data.user)
        } catch (error) {
            console.log(error)
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
                                        <button type="button" onClick={(e) => deleteUser(e, user.id)} class="btn btn-danger">Delete</button>
                                        <button type="button" data-bs-toggle="modal" data-bs-target="#updateUserModal" onClick={() => getUser(user.id)} class="btn btn-warning">Update</button>
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
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" name='name' value={user?.name} className="form-control" id="name" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name='email' value={user?.email} className="form-control" id="email" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" name='password' value={user?.passowrd} className="form-control" id="password" />
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