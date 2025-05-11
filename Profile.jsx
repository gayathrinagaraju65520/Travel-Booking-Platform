import React from 'react';
import '../style/Profile.css';
import profilePhoto from './image.png';

const Profile = () => {
  return (
    <div className="user-dashboard">
      {/* Profile Photo */}
      <div className="user-profile-photo">
        <img src={profilePhoto} alt="Profile" />
      </div>

      {/* Header Section */}
      <div className="user-header">
        <h1>Welcome</h1>

        <div className="user-account-info">
          <div>
            <p className="user-info-label">Account email</p>
            <p className="user-info-value">pgshankar1075@gmail.com</p>
          </div>

          <div>
            <p className="user-info-label">Home airport</p>
            <p className="user-info-value">
              Vijayawada, India – Vijayawada <span className="user-checkmark">✅</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="user-main-menu">
        <ul>
          <li className="user-active">Dashboard</li>
          <li>Account</li>
          <li>Preferences</li>
          <li>Travellers</li>
          <li>Payment methods</li>
          <li>Notifications</li>
        </ul>
      </nav>
    </div>
  );
};

export default Profile;