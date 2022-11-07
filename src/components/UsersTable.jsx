import React from 'react'
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