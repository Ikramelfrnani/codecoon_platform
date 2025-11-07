// /ResetPassword.jsx
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../axios';
import '../Components/Login.css';
import {Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/api/reset-password', {
        token,
        email,
        password,
        password_confirmation: confirm,
      });
      toast.success(res.data.status);

    } catch (err) {
      if (err.response && err.response.data) {
        console.log('Full error response:', err.response.data);
        if (err.response.data.errors) {
          const messages = Object.values(err.response.data.errors).flat().join(' ');
          setStatus(messages);
        } else if (err.response.data.message) {
          toast.error(err.response.data.message);
        } else {
          toast.error('Something went wrong.');
        }
      } else {
        console.error(err);
        setStatus('Something went wrong.');
      }
    }


  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className='logo-wrapper'>
          <img src="images/Logo-cropped.svg" alt="Logo" className='logo' style={{marginBottom:'20px'}}/>
        </div>
        <h2 style={{ marginBottom: '30px', textAlign: 'center' }}>
          Enter new password for{' '}
          <p style={{ color: ' #8E44AD', fontSize: '18px' }}>{email}</p>
        </h2>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="password-wrapper">
          <input type={showPassword ? "text" : "password"} 
          placeholder="New password" className="password-input" value={password} onChange={e => setPassword(e.target.value)} />
          <span className="toggle-password" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          </div>
          <div className="password-wrapper">
          <input type={showConfirmPassword ? "text" : "password"} 
          placeholder="Confirm password" className="password-input" value={confirm} onChange={e => setConfirm(e.target.value)} />
          <span className="toggle-password" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          </div>
          <button type="submit" className="login-btn">Set new Password</button>
        </form>
        <div style={{marginTop:'2rem'}}>
        <Link to="/login" className='link' >Back to Login</Link>
        </div>
      </div>
      <ToastContainer theme='dark' />
    </div>
  );
}
export default ResetPassword;