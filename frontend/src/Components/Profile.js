import React from 'react';

function Profile() {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) return <p>Utilisateur non connecté</p>;

  return (
    <div>
      <h1>Bienvenue {user.first_name}</h1>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
