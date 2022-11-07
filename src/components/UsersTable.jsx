import React, { useEffect } from 'react'
import axiosInstance from '../axios';

function UsersTable(props) {

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
        const response = await axiosInstance.get(`users/${id}`)
        console.log(response.data.user)
    }

    useEffect(() => {
        getUser()
    }, [])

    return (
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
    )
}

export default UsersTable