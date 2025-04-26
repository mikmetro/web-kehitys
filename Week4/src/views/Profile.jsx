import React, {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const {getUserByToken} = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const userResult = await getUserByToken(token);
        setUser(userResult.user);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <h2 className="text-2xl font-bold">Profile</h2>
      {user && (
        <>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>
            Register Date: {new Date(user.created_at).toLocaleString('fi-FI')}
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
