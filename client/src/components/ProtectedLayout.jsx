import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

function ProtectedLayout() {
    const navigate = useNavigate();

    useEffect(() => {
        const updateExpiryTime = () => {
            const now = new Date().getTime();
            localStorage.setItem('expiryTime', now + (60 * 60 * 1000)); // Refresh expiry time
        };

        // Check session validity
        const checkSession = () => {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            const expiryTime = localStorage.getItem('expiryTime');
            const now = new Date().getTime();

            if (!token || now > expiryTime) {
                localStorage.clear();
                navigate('/login'); // Redirect to login if session expired
            }
        };

        // Run the session check when the component mounts
        checkSession();

        // Listen for user activity to refresh session expiry time
        window.addEventListener('mousemove', updateExpiryTime);
        window.addEventListener('keydown', updateExpiryTime);

        return () => {
            window.removeEventListener('mousemove', updateExpiryTime);
            window.removeEventListener('keydown', updateExpiryTime);
        };
    }, [navigate]);

    return (
        <div>
            {/* Renders the nested route's content */}
            <Outlet />
        </div>
    );
}

export default ProtectedLayout;
