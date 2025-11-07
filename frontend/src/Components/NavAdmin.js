import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaBell, FaAward, FaCoins} from 'react-icons/fa';
import { MdAccountCircle, MdHelpOutline, MdLogout } from 'react-icons/md';
import api from '../axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById } from '../slices/profileSlice';

const NavbarWrapper = styled.div`
  position: sticky;
  top: -100px;
  z-index: 1000;
  background-color: #13002c;
  transition: top 0.3s ease, background-color 0.3s ease;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const NavbarContainer = styled.nav`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 5vh;

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0;

  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

const LogoImage = styled.img`
  width: 70%;
  height: auto;

  @media (max-width: 768px) {
    height: 12.5vh;
    width: auto;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-left: -4rem;

  @media (max-width: 768px) {
    gap: 1rem;
    margin-left: 1rem;
  }
`;

const StyledLink = styled(NavLink)`
  position: relative;
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  padding: 0.5rem 1rem;
  transition: color 0.3s ease, background-color 0.3s ease;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -58%;
    width: 0%;
    height: 2px;
    background-color: #8E44AD;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
    opacity: 0.5;
  }

  &.active::after {
    width: 100%;
  }
`;

const UserIcon = styled.div`
  width: 38px;
  height: 38px;
  background-color: #8E44AD;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 2rem;
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-right: 2rem;
`;

const Button = styled(Link)`
  background: transparent;
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.6rem 1.3rem;
  border-radius: 50px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  &:hover {
    background-color: rgba(255, 255, 255, 0.05);
  }
`;

const Count = styled.span`
  font-size: 0.8rem;
  background-color: rgba(255,255,255,0.3);
  border-radius: 12px;
  padding: 2px 7px;
  font-weight: 600;
`;

const DropdownWrapper = styled.div`
  position: relative;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 3.8rem;
  right: 2rem;
  background-color: #13002c;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  width: 15vw;
  padding: 0.8rem 0.5rem;
  z-index: 1500;
  font-family: 'Inter', sans-serif;
`;

const DropdownItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 10px;
  transition: background-color 0.3s ease;

  &:hover {
    border-radius: 10px;
    background-color: rgba(142, 68, 173, 0.2);
  }
`;
const BadgeIcon = styled.img`
  width: 26px;
  height: 26px;
  object-fit: contain;
  vertical-align: middle;
`;



const NavAdmin = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.data);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    const userId = localStorage.getItem('idUser');
    if (userId) {
      dispatch(fetchUserById(userId));
    }
  }, [dispatch]);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await api.post('/api/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    }
    
    // Clear ALL relevant data
    localStorage.removeItem('user');
    localStorage.removeItem('idUser');
    localStorage.removeItem('utilisateur_id');
    
    // Force a hard refresh to ensure all states are cleared
    // window.location.href = '/login';
    navigate('/login');
  };
  return (
    <NavbarWrapper>
      <NavbarContainer>
        <LogoContainer>
          <Link to="/home">
            <LogoImage src="/images/CodeCoon_logo.svg" alt="CodeCoon Logo" />
          </Link>
        </LogoContainer>
        <RightContainer>
          <NavLinks>
            <StyledLink to="/admin/dashboard" style={{ marginRight:'50px' }}>Dashboard</StyledLink>
          </NavLinks>
          <DropdownWrapper ref={dropdownRef}>
            <UserIcon onClick={() => setDropdownOpen(!dropdownOpen)}>
              {user?.first_name?.[0]?.toUpperCase() || 'U'}
            </UserIcon>
            {dropdownOpen && (
              <DropdownMenu>
                <DropdownItem to="/profile">
                  <MdAccountCircle size={20} /> Account
                </DropdownItem>
                <DropdownItem to="/support">
                  <MdHelpOutline size={20} /> Support
                </DropdownItem>
                <DropdownItem as="span" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <MdLogout size={20} /> Log out
                </DropdownItem>
              </DropdownMenu>
            )}
          </DropdownWrapper>
        </RightContainer>
      </NavbarContainer>
    </NavbarWrapper>
  );
};

export default NavAdmin;
