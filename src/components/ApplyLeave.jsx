import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addLeave, getEmployeeLeaveBalance } from '../utils/localStorage';
import { validateLeaveForm, calculateLeaveDays } from '../utils/validation';

const ApplyLeave = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    leaveType: '',
    startDate: '',
    endDate: '',
    reason: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const [leaveBalance, setLeaveBalance] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const balance = getEmployeeLeaveBalance(user.email);
    setLeaveBalance(balance);
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage('');

    const validationErrors = validateLeaveForm(formData, leaveBalance);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const days = calculateLeaveDays(formData.startDate, formData.endDate);
    
    const leaveRequest = {
  employeeName: user.name,
  employeeId: user.id,
  employeeEmail: user.email,   // ADD THIS LINE
  leaveType: formData.leaveType,
  startDate: formData.startDate,
  endDate: formData.endDate,
  days: days,
  reason: formData.reason,
  status: 'Pending'
};

    addLeave(leaveRequest);
    
    setSuccessMessage('Leave request submitted successfully!');
    setFormData({
      leaveType: '',
      startDate: '',
      endDate: '',
      reason: ''
    });

    setTimeout(() => {
      navigate('/my-requests');
    }, 1500);
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!leaveBalance) {
    return <div className="container"><p>Loading...</p></div>;
  }

  return (
    <div>
      <nav>
        <h1>Apply Leave</h1>
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
        <div className="form-container">
          {successMessage && (
            <div className="alert success" data-testid="leave-success">
              {successMessage}
            </div>
          )}

          {Object.keys(errors).length > 0 && !successMessage && (
            <div className="alert error" data-testid="leave-error">
              Please correct the errors below.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <h2>Request Leave</h2>

            <div className="form-group">
              <label htmlFor="leaveType">Leave Type *</label>
              <select
                id="leaveType"
                name="leaveType"
                data-testid="leave-type"
                value={formData.leaveType}
                onChange={handleChange}
              >
                <option value="">Select leave type</option>
                <option value="Casual Leave">Casual Leave (Available: {leaveBalance.casual})</option>
                <option value="Sick Leave">Sick Leave (Available: {leaveBalance.sick})</option>
                <option value="Earned Leave">Earned Leave (Available: {leaveBalance.earned})</option>
              </select>
              {errors.leaveType && (
                <div className="alert error" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  {errors.leaveType}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                data-testid="start-date"
                value={formData.startDate}
                onChange={handleChange}
              />
              {errors.startDate && (
                <div className="alert error" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  {errors.startDate}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="endDate">End Date *</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                data-testid="end-date"
                value={formData.endDate}
                onChange={handleChange}
              />
              {errors.endDate && (
                <div className="alert error" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  {errors.endDate}
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="reason">Reason *</label>
              <textarea
                id="reason"
                name="reason"
                data-testid="leave-reason"
                value={formData.reason}
                onChange={handleChange}
                placeholder="Enter reason for leave"
              />
              {errors.reason && (
                <div className="alert error" style={{ marginTop: '0.5rem', marginBottom: 0 }}>
                  {errors.reason}
                </div>
              )}
            </div>

            {errors.days && (
              <div className="alert error" data-testid="leave-error">
                {errors.days}
              </div>
            )}

            <div className="form-buttons">
              <button 
                type="submit" 
                className="success"
                data-testid="submit-leave"
              >
                Submit Leave
              </button>
              <button 
                type="button" 
                className="secondary"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyLeave;
