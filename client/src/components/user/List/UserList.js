import React, { useState, useEffect } from "react";
import { fetchUsers } from '../../../api/Axios';

import './UserList.css';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    useEffect(() => {
        const getUsers = async () => {
        const fetchedUsers = await fetchUsers(page, limit);
        setUsers(fetchedUsers);
        };
        getUsers();
    }, [page, limit]);

    const handleFirstPage = () => {
        setPage(1);
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const handleNextPage = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handleLastPage = () => {
        // Replace this with the actual last page number from your API
        const lastPage = Math.ceil(users.length / limit);
        setPage(lastPage);
    };

    return <div>
        <table>
            <thead>
                <tr>
                    <th>Users</th> 
                </tr>
            </thead>
            <tbody>
                {users.map((user) => {
                    return <tr key={user.id}>
                        <td>
                            {user.name}
                        </td>
                    </tr>
                })}
            </tbody>
        </table>
        <div>
            <button onClick={handleFirstPage}>First</button>
            <button onClick={handlePreviousPage}>Previous</button>
            <button onClick={handleNextPage}>Next</button>
            <button onClick={handleLastPage}>Last</button>
        </div>
    </div>
}

export default UserList