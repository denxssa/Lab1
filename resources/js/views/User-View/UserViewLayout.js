import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const UserViewLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="user-view">
      <Outlet />
    </div>
  );
};

export default UserViewLayout;
