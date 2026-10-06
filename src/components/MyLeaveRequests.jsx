import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getEmployeeLeaves, deleteLeave } from '../utils/localStorage';
import { formatDate } from '../utils/validation';

const MyLeaveRequests = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const employeeLeaves = getEmployeeLeaves(user.id);
    setLeaves(employeeLeaves);
  }, [user, navigate]);

  const handleCancel = (leaveId) => {
    if (window.confirm('Are you sure you want to cancel this leave request?')) {
      deleteLeave(leaveId);
      setLeaves(leaves.filter(leave => leave.id !== leaveId));
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div>
      <nav>
        <h1>My Leave Requests</h1>
        <div className="user-info">
          <p>Welcome, {user.name}</p>
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
        <div className="dashboard">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Leave Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Days</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {leaves.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center' }}>
                      No leave requests found
                    </td>
                  </tr>
                ) : (
                  leaves.map((leave) => (
                    <tr key={leave.id}>
                      <td>{leave.leaveType}</td>
                      <td>{formatDate(leave.startDate)}</td>
                      <td>{formatDate(leave.endDate)}</td>
                      <td>{leave.days}</td>
                      <td>{leave.reason}</td>
                      <td>
                        <span style={{
                          padding: '0.4rem 0.8rem',
                          borderRadius: '4px',
                          fontWeight: 'bold',
                          backgroundColor: 
                            leave.status === 'Approved' ? '#d4edda' :
                            leave.status === 'Rejected' ? '#f8d7da' :
                            '#d1ecf1',
                          color:
                            leave.status === 'Approved' ? '#155724' :
                            leave.status === 'Rejected' ? '#721c24' :
                            '#0c5460'
                        }}>
                          {leave.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {leave.status === 'Pending' && (
                            <button 
                              className="danger"
                              onClick={() => handleCancel(leave.id)}
                              data-testid={`cancel-leave-${leave.id}`}
                            >
                              Cancel
                            </button>
                          )}
                          {leave.status !== 'Pending' && (
                            <span style={{ color: '#7f8c8d' }}>—</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="dashboard-buttons">
            <button 
              className="primary"
              onClick={() => navigate('/dashboard')}
            >
              Back to Dashboard
            </button>
            <button 
              className="primary"
              onClick={() => navigate('/apply-leave')}
            >
              Apply New Leave
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyLeaveRequests;
