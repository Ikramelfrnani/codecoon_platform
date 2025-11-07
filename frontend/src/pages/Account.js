
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUserById, deleteUserById } from '../slices/profileSlice';
import NavBar from "../Components/Navbar";
import '../Components/Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NavAdmin from '../Components/NavAdmin';

export default function Account() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.data);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);
  const deleteStatus = useSelector((state) => state.users.deleteStatus);

  const [isUpdating, setIsUpdating] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const userId = localStorage.getItem('idUser');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');

  useEffect(() => {
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setEmail(user.email || '');
      setAge(user.age || '');
    }
  }, [user]);

  useEffect(() => {
    if (deleteStatus === 'succeeded') {
      localStorage.removeItem('idUser');
      toast.success("Your account has been successfully deleted.");
      navigate('/login');
    }
  }, [deleteStatus, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user?.role === 'admin') {
      toast.info("Admins cannot modify profile information.");
      return;
    }

    if (userId) {
      setIsUpdating(true);
      try {
        await dispatch(updateUserById({ id: userId, field: 'first_name', value: firstName }));
        await dispatch(updateUserById({ id: userId, field: 'last_name', value: lastName }));
        await dispatch(updateUserById({ id: userId, field: 'age', value: age }));
        toast.success("Profile updated successfully!");
      } catch (err) {
        console.error('Update failed:', err);
        toast.error("Update failed. Please try again.");
      } finally {
        setIsUpdating(false);
      }
    }
  };
  useEffect(() => {
  if (status === 'failed' && error) {
    toast.error(error);
  }
}, [status, error]);

  const handleDelete = () => {
    if (user?.role === 'admin') {
      toast.info("Admin accounts cannot be deleted.");
      return;
    }
    dispatch(deleteUserById(userId));
  };

  return (
    <div>
      {/* <NavBar /> */}
      {user?.role === 'admin' ? <NavAdmin /> : <NavBar />}

      <div className="Container">
        <div className="login-container">
          <h1 style={{ marginBottom: '3rem' }}>Personal Information</h1>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="name-fields">
              <input
                type="text"
                required
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={user?.role === 'admin'}
              />
              <input
                type="text"
                required
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={user?.role === 'admin'}
              />
            </div>

            <input
              type="email"
              required
              placeholder="E-mail"
              value={email}
              disabled
              style={{ cursor: 'not-allowed', color: '#888' }}
            />

            {user?.role !== 'admin' && (
              <input
                type="number"
                required
                placeholder="Age"
                min={6}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            )}

            {user?.role === 'admin' ? (
              <Link
                to="/change-password"
                className="login-btn"
                style={{ marginBottom: '2rem', textAlign: 'center', display: 'inline-block' ,textDecoration: 'none'}}
              >
                Change Password
              </Link>
            ) : (
              <button
                type="submit"
                className="login-btn"
                style={{ marginBottom: '2rem' }}
                disabled={isUpdating}
              >
                {isUpdating ? 'Updating...' : 'Update Profile'}
              </button>
            )}

          </form>

          {/* {status === 'failed' && <p style={{ color: 'red' }}>{error}</p>} */}

          <div className="link-group">
            {user?.role !== 'admin' && (
              <button
                className="login-btn burgundy"
                onClick={() => setShowDeletePopup(true)}
              >
                Delete Account
              </button>
            )}
            {user?.role !== 'admin' && (
            <Link to="/change-password" className="link">Change Password</Link>
          )}

          </div>
        </div>
      </div>

      {showDeletePopup && user?.role !== 'admin' && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-icon" onClick={() => setShowDeletePopup(false)}>&times;</button>
            <p>By deleting your account you will lose all your learning progress.</p>
            <p>Are you sure you want to delete your account?</p>
            <div className="popup-buttons">
              <button
                className="login-btn burgundy"
                onClick={() => {
                  setShowDeletePopup(false);
                  handleDelete();
                }}
                disabled={deleteStatus === 'loading'}
              >
                {deleteStatus === 'loading' ? 'Deleting...' : 'Yes, Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* <ToastContainer theme='dark' /> */}
    </div>
  );
}
