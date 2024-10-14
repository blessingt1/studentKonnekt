import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', role: '0' });
    const [editingUserId, setEditingUserId] = useState(null);
    const token = localStorage.getItem('token');



    // Fetch all users
    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission for creating/updating users
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingUserId) {
                // Update user
                await axios.put(`/api/users/${editingUserId}`, formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('User updated');
            } else {
                // Create new user
                await axios.post('/api/users', formData, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('New user created');
            }
            setFormData({ first_name: '', last_name: '', email: '', password: '', role: '0' });
            setEditingUserId(null);
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error saving user:', error);
        }
    };

    // Handle edit button click
    const handleEdit = (user) => {
        setFormData({
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            password: '',
            role: user.role.toString(), // Convert role to string for select input
        });
        setEditingUserId(user._id);
    };

    // Handle delete button click
    const handleDelete = async (userId) => {
        try {
            await axios.delete(`/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log('User deleted');
            fetchUsers(); // Refresh user list
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <div>
            <h1>User Administration</h1>

            {/* Form for creating or editing users */}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleChange}
                    placeholder="First Name"
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleChange}
                    placeholder="Last Name"
                    required
                />
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    required={editingUserId === null} // Password is required only for new users
                />
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="0">Admin</option>
                    <option value="1">Lecturer</option>
                    <option value="2">Student</option>
                </select>
                <button type="submit">{editingUserId ? 'Update User' : 'Create User'}</button>
            </form>


            {/* Table to display list of users */}
            <h2>User List</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>







            </table>
        </div>
    );
};

export default Admin;
