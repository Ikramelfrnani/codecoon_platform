import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import api from '../axios';
import './Register.css';
// Import Toastify components
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    age: ''
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const validateField = (name, value) => {
    switch (name) {
      case 'firstName':
        if (value.length < 2) return 'First Name must be at least 2 characters.';
        if (/\d/.test(value)) return 'First Name cannot contain numbers.';
        break;
      case 'lastName':
        if (value.length < 2) return 'Last Name must be at least 2 characters.';
        if (/\d/.test(value)) return 'Last Name cannot contain numbers.';
        break;
      case 'email':
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalid email format.';
        break;
      case 'password':
        if (value.length < 8) return 'Password must be at least 8 characters.';
        if (!/[A-Z]/.test(value)) return 'Password must include an uppercase letter.';
        if (!/[a-z]/.test(value)) return 'Password must include a lowercase letter.';
        if (!/\d/.test(value)) return 'Password must include a number.';
        break;
      case 'confirmPassword':
        if (value !== form.password) return 'Passwords do not match.';
        break;
      case 'age':
        if (!value || isNaN(value) || Number(value) < 6) return 'You must be at least 6 years old.';
        break;
      default:
        break;
    }
    return '';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) {
      setErrors((prev) => ({ ...prev, [name]: error }));
      // Left-aligned toast with dark theme
      toast.error(error, {
        autoClose: 4000,
        style: { textAlign: 'left', backgroundColor: '#1e1e1e', color: '#fff' },
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    Object.entries(form).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) validationErrors[name] = error;
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Show first validation error as toast
      toast.error(Object.values(validationErrors)[0], {
        autoClose: 4000,
        style: { textAlign: 'left', backgroundColor: '#1e1e1e', color: '#fff' },
      });
      return;
    }

    try {
      await api.get('/sanctum/csrf-cookie');

      await api.post('/api/register', {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        password_confirmation: form.confirmPassword,
        age: form.age,
      });

      const loginRes = await api.post('/api/login', {
        email: form.email,
        password: form.password,
      });

      const { user } = loginRes.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('utilisateur_id', user.utilisateur_id);

      toast.success('Registration successful! Redirecting...', {
        autoClose: 1500,
        style: { textAlign: 'left', backgroundColor: '#1e1e1e', color: '#fff' },
      });

      setTimeout(() => {
        navigate('/start-questionnaire');
      }, 1500);

    } catch (err) {
      const message = err.response?.data?.message || 'An error occurred during registration.';
      toast.error(message, {
        autoClose: 4000,
        style: { textAlign: 'left', backgroundColor: '#1e1e1e', color: '#fff' },
      });
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Toastify container with dark theme */}
        <ToastContainer
          position="top-right"
          autoClose={4000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="dark"
          toastStyle={{ textAlign: 'left', backgroundColor: '#1e1e1e', color: '#fff' }}
        />

        <div className="logo-wrapper">
          <img src="images/Logo-cropped.svg" alt="Logo" className="logo" />
        </div>

        <h1 className="title">Sign Up</h1>
        <p className="subtitle">Join us now by signing up!</p>

        <form onSubmit={handleSubmit} className="signup-form" noValidate>
          <div className="name-fields">
            <input
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />

          <div className="password-wrapper">
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="password-wrapper">
            <input
              name="confirmPassword"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <span
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <input
            name="age"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            onBlur={handleBlur}
            required
          />

          <button type="submit" className="signup-btn">Sign Up</button>
        </form>

        <p className="terms">
          By clicking Sign Up, I agree to CodeCoon's Terms and Privacy Policy.
        </p>

        <p className="signin-link">
          Already have an account? <Link to="/login" style={{ color: '#8E44AD' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}