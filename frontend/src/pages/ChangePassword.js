import React, { useState } from "react";
import { useSelector } from "react-redux";
import NavBar from "../Components/Navbar";
import NavAdmin from "../Components/NavAdmin";
import '../Components/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePassword() {
    const user = useSelector((state) => state.users.data);
    const navigate = useNavigate();

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const userId = localStorage.getItem('idUser');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.put(`http://localhost:8000/api/users/${userId}/change-password`, {
                current_password: currentPassword,
                new_password: newPassword,
                new_password_confirmation: confirmPassword
            });

            toast.success(response.data.message || "Password updated successfully");

            setTimeout(async () => {
                try {
                    await axios.post('/api/logout');
                } catch (error) {
                    console.error('Logout failed:', error);
                }
                localStorage.removeItem('idUser');
                navigate('/login');
            }, 1500);

        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating password");
            setLoading(false);
        }
    };

    return (
        <div>
            <ToastContainer theme="dark"/>
            {user?.role === 'admin' ? <NavAdmin /> : <NavBar />}

            <div className="Container">
                <div className="login-container">
                    <h1 style={{ marginBottom: '3rem' }}>Change Your Password</h1>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="password-wrapper">
                            <input
                                type={showOldPassword ? "text" : "password"}
                                placeholder="Current password"
                                className="password-input"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                disabled={loading}
                            />
                            <span className="toggle-password" onClick={() => setShowOldPassword(!showOldPassword)}>
                                {showOldPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New password"
                                className="password-input"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                disabled={loading}
                            />
                            <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                className="password-input"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                disabled={loading}
                            />
                            <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>

                        <button type="submit" className="login-btn" style={{ marginBottom: '2rem' }} disabled={loading}>
                            {loading ? "Setting..." : "Set Password"}
                        </button>
                    </form>

                    <Link to="/profile" className="link">Back to Account</Link>
                </div>
            </div>
        </div>
    );
}
