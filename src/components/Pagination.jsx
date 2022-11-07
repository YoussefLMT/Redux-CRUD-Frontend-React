import React from 'react'

function Pagination(props) {

    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(props.totalusers / props.usersPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {
                    pageNumbers.map((number) => (
                        <li key={number} className="page-item">
                            <a className="page-link" onClick={() => props.paginate(number)} href="#">{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination