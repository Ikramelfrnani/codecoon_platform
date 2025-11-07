import React, { useState } from 'react';
import api from '../axios';
import './Login.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify'; // 👈 Import toast
import 'react-toastify/dist/ReactToastify.css'; // 👈 Don't forget CSS

function Login() {
  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    toast.dismiss(); // Clear previous toasts

    try {
      await api.get('/sanctum/csrf-cookie');
      const res = await api.post('/api/login', form);

      const { user } = res.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('idUser', user.id);
      localStorage.setItem('utilisateur_id', user.utilisateur_id);

      try {
        const emptyFieldRes = await api.get(`/api/utilisateurs/${user.utilisateur_id}/empty-fields`);
        const { empty_field } = emptyFieldRes.data;

        if (empty_field) {
          navigate('/continue-questionnaire');
        } else {
          toast.success("Login successful! Redirecting...");
          setTimeout(() => {
            if (user.role === 'admin') {
              window.location.href = '/admin/dashboard';
            } else {
              window.location.href = '/home';
            }
          }, 1000);
        }
      } catch (checkError) {
        console.error("Error checking empty fields:", checkError);
        setTimeout(() => {
          if (user.role === 'admin') {
            window.location.href = '/admin/dashboard';
          } else {
            window.location.href = '/home';
          }
        }, 1000);
      }

    } catch (err) {
      const errorMessage = err.response?.data?.message || "An error occurred during login.";
      toast.error(errorMessage); // Show error as toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className='logo-wrapper'>
          <img src="images/Logo-cropped.svg" alt="Logo" className='logo'/>
        </div>

        <h1 className="title">Sign In</h1>
        <p className="subtitle">Good to see you again! Enter your credentials to log in.</p>

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <input
            placeholder="E-mail"
            type="email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
            disabled={loading}
          />

          <div className="password-wrapper">
            <input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="password-input"
              disabled={loading}
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setShowPassword(!showPassword); }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>
          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div style={{marginTop:'2rem'}}>
          <p className="signin-link">
            Not registered yet? <Link to="/register" style={{color: '#8E44AD'}}>Create an account</Link>
          </p>
          <p className="signin-link">
            <Link to="/forgot-password" style={{color: '#8E44AD'}}>Forgot your password?</Link>
          </p>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer 
        theme="dark" 
        style={{ zIndex: 10000 }}
      />
    </div>
  );
}

export default Login;