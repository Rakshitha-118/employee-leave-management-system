import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEmployeeLeaveBalance, getEmployeeLeaves } from '../utils/localStorage';
import { formatDate } from '../utils/validation';

const EmployeeDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [leaveBalance, setLeaveBalance] = useState(null);
  const [leaveStats, setLeaveStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0
  });
  const [recentLeaves, setRecentLeaves] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const balance = getEmployeeLeaveBalance(user.email);
    setLeaveBalance(balance);

    const leaves = getEmployeeLeaves(user.id);

    const stats = {
      pending: leaves.filter(l => l.status === 'Pending').length,
      approved: leaves.filter(l => l.status === 'Approved').length,
      rejected: leaves.filter(l => l.status === 'Rejected').length
    };

    setLeaveStats(stats);
    setRecentLeaves(leaves.slice(-3).reverse());
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleApplyLeave = () => {
    navigate('/apply-leave');
  };

  const handleMyRequests = () => {
    navigate('/my-requests');
  };

  if (!leaveBalance) {
    return (
      <div className="container">
        <p>Loading...</p>
      </div>
    );
  }

  const totalAvailable =
    leaveBalance.casual +
    leaveBalance.sick +
    leaveBalance.earned;

  return (
    <div className="employee-page">

      {/* HEADER */}
      <nav className="employee-nav">
        <div>
          <h1>Employee Leave Management</h1>
          <span className="nav-subtitle">Employee Portal</span>
        </div>

        <div className="user-info">
          <div className="nav-user">
            <div className="nav-avatar">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <div>
              <strong>{user.name}</strong>
              <small>{user.id}</small>
            </div>
          </div>

          <button
            className="secondary"
            onClick={handleLogout}
            data-testid="logout-button"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="container">

        {/* WELCOME */}
        <div className="employee-welcome">
          <div className="welcome-content">
            <span className="welcome-small">
              Welcome back 👋
            </span>

            <h2>{user.name}</h2>

            <p>
              Here's an overview of your leave balance and requests.
            </p>

            <div className="employee-id-badge">
              Employee ID: {user.id}
            </div>
          </div>

          <div className="welcome-illustration">
            📅
          </div>
        </div>

        {/* QUICK ACTIONS */}
        <div className="quick-actions">

          <button
            className="quick-action apply-action"
            onClick={handleApplyLeave}
            data-testid="apply-leave-btn"
          >
            <span className="quick-icon">➕</span>

            <div>
              <strong>Apply for Leave</strong>
              <small>Submit a new leave request</small>
            </div>

            <span className="arrow">→</span>
          </button>

          <button
            className="quick-action request-action"
            onClick={handleMyRequests}
            data-testid="my-requests-btn"
          >
            <span className="quick-icon">📋</span>

            <div>
              <strong>My Leave Requests</strong>
              <small>View your request history</small>
            </div>

            <span className="arrow">→</span>
          </button>

        </div>

        {/* LEAVE BALANCE */}
        <div className="employee-section-title">

          <div>
            <h2>My Leave Balance</h2>
            <p>Available leave days for this year</p>
          </div>

          <div className="total-leave">
            <strong>{totalAvailable}</strong>
            <span>Total Days</span>
          </div>

        </div>

        <div className="modern-leave-grid">

          {/* CASUAL */}
          <div className="modern-leave-card casual-card">

            <div className="leave-card-header">
              <div className="leave-icon">☀️</div>
              <span>CASUAL</span>
            </div>

            <div className="leave-number">
              {leaveBalance.casual}
            </div>

            <p>Days Available</p>

            <div className="leave-line">
              <div
                style={{
                  width: `${Math.min(
                    (leaveBalance.casual / 10) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <small>Casual Leave</small>

          </div>

          {/* SICK */}
          <div className="modern-leave-card sick-card">

            <div className="leave-card-header">
              <div className="leave-icon">💙</div>
              <span>SICK</span>
            </div>

            <div className="leave-number">
              {leaveBalance.sick}
            </div>

            <p>Days Available</p>

            <div className="leave-line">
              <div
                style={{
                  width: `${Math.min(
                    (leaveBalance.sick / 10) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <small>Sick Leave</small>

          </div>

          {/* EARNED */}
          <div className="modern-leave-card earned-card">

            <div className="leave-card-header">
              <div className="leave-icon">⭐</div>
              <span>EARNED</span>
            </div>

            <div className="leave-number">
              {leaveBalance.earned}
            </div>

            <p>Days Available</p>

            <div className="leave-line">
              <div
                style={{
                  width: `${Math.min(
                    (leaveBalance.earned / 15) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <small>Earned Leave</small>

          </div>

        </div>

        {/* REQUEST OVERVIEW */}
        <div className="employee-section-title request-title">

          <div>
            <h2>Request Overview</h2>
            <p>Track the status of your leave applications</p>
          </div>

        </div>

        <div className="request-overview">

          <div className="request-card pending-request">
            <div className="request-icon">⏳</div>

            <div>
              <span>Pending</span>
              <strong>{leaveStats.pending}</strong>
            </div>
          </div>

          <div className="request-card approved-request">
            <div className="request-icon">✓</div>

            <div>
              <span>Approved</span>
              <strong>{leaveStats.approved}</strong>
            </div>
          </div>

          <div className="request-card rejected-request">
            <div className="request-icon">×</div>

            <div>
              <span>Rejected</span>
              <strong>{leaveStats.rejected}</strong>
            </div>
          </div>

        </div>

        {/* RECENT REQUESTS */}
        <div className="recent-section">

          <div className="employee-section-title">

            <div>
              <h2>Recent Leave Requests</h2>
              <p>Your latest applications</p>
            </div>

            <button
              className="view-all-btn"
              onClick={handleMyRequests}
            >
              View All →
            </button>

          </div>

          {recentLeaves.length === 0 ? (

            <div className="empty-requests">

              <div>📭</div>

              <h3>No Leave Requests Yet</h3>

              <p>
                You haven't submitted any leave requests.
              </p>

              <button
                className="primary"
                onClick={handleApplyLeave}
              >
                Apply Your First Leave
              </button>

            </div>

          ) : (

            <div className="recent-list">

              {recentLeaves.map((leave) => (

                <div
                  className="recent-item"
                  key={leave.id}
                >

                  <div className="recent-leave-icon">
                    {leave.leaveType === 'Casual Leave'
                      ? '☀️'
                      : leave.leaveType === 'Sick Leave'
                      ? '💙'
                      : '⭐'}
                  </div>

                  <div className="recent-info">

                    <strong>{leave.leaveType}</strong>

                    <span>
                      {formatDate(leave.startDate)} - {formatDate(leave.endDate)}
                    </span>

                  </div>

                  <div className="recent-days">

                    <strong>{leave.days}</strong>

                    <span>day(s)</span>

                  </div>

                  <span
                    className={`employee-status ${leave.status.toLowerCase()}`}
                  >
                    {leave.status}
                  </span>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default EmployeeDashboard;