import React from 'react';
import './AllUsers.css';
function AllUsers() {
    return (
        <div>
            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        
                        <th>Action</th>
                        
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Anand kumar Choudhary</td>
                        
                        <td><button className='table-btn'>Delete</button></td>
                        
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Shivam Sharma</td>
                        
                        <td><button className='table-btn'>Delete</button></td>
                        
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td>Harikesh Rai</td>
                        
                        <td><button className='table-btn'>Delete</button></td>
                        
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default AllUsers
