import React from 'react';
import { useSelector } from 'react-redux';

const Dashboard = () => {
  const { currentUser } = useSelector((state) => state.user);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  let dashboardContent;
  if (currentUser.user.isAdmin) {
    dashboardContent = <h1>Welcome Admin!</h1>;
  } else if (currentUser.user.role === 'volunteer') {
    dashboardContent = <h1>Welcome Volunteer!</h1>;
  } else if (currentUser.user.role === 'emergencyresponder') {
    dashboardContent = <h1>Welcome Emergency Responder!</h1>;
  } else {
    dashboardContent = <h1>Welcome </h1>;
  } 
  return (
    <div>
      {dashboardContent}
    </div>
  );
};

export default Dashboard;
