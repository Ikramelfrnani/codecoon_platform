import { useState } from 'react';
import api from '../axios';
import '../Components/Login.css';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [buttonText, setButtonText] = useState('Send Reset Link');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Start loading
    setButtonText('Sending...'); // Change text while sending
    try {
      const response = await api.post('/api/forgot-password', { email });
      toast.success('Reset link sent!');
      setStatus(response.data.status);
      setButtonText('Resend Email'); // After success
    } catch (error) {
      console.error(error); // Log the error
      setStatus(error.response?.data?.email || 'Something went wrong.');
      toast.error('Something went wrong try again');
      setButtonText('Send Reset Link'); // Reset on error
    } finally {
      setIsSubmitting(false); // End loading
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className='logo-wrapper'>
          <img src="images/Logo-cropped.svg" alt="Logo" className='logo' style={{marginBottom:'20px'}} />
        </div>
        <h2 style={{marginBottom:'30px'}}>Please enter your e-mail address</h2>
        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="login-btn"
            disabled={isSubmitting} // Prevent multiple clicks
          >
            {buttonText}
          </button>
        </form>
        <div style={{marginTop:'2rem'}}>
        <Link to="/login" className='link'>Back to Login</Link>
        <p className='supp-para'>
          If you're still having trouble, reach out to <Link to="/" className='link'>support</Link>.
        </p>
        </div>
      </div>
      <ToastContainer theme='dark' />
    </div>
  );
}
