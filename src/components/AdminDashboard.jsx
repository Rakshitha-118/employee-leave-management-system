import React, { useState, useEffect } from 'react'; 
import { useNavigate } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 
import { getLeaves, updateLeave, updateEmployeeLeaveBalance, getLeaveStatistics } from '../utils/localStorage'; 
import { formatDate } from '../utils/validation'; 
 
const AdminDashboard = () => { 
  const navigate = useNavigate(); 
  const { user, logout } = useAuth(); 
  const [leaves, setLeaves] = useState([]); 
  const [statistics, setStatistics] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 }); 

  // ADDED: Employee section
  const [employees, setEmployees] = useState([]);
  const [searchEmployee, setSearchEmployee] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  
  useEffect(() => { 
    if (!user || user.role !== 'admin') { 
      navigate('/login'); 
      return; 
    } 
 
    loadData(); 
    loadEmployees(); // ADDED
  }, [user, navigate]); 
 
  const loadData = () => { 
    const allLeaves = getLeaves(); 
    setLeaves(allLeaves); 
    const stats = getLeaveStatistics(); 
    setStatistics(stats); 
  }; 

  // ADDED: Load all employees
  const loadEmployees = () => {
    const employeeData = JSON.parse(
      localStorage.getItem('employees') || '{}'
    );

    setEmployees(Object.values(employeeData));
  };
 
  const handleApprove = (leaveId) => { 
    const leave = leaves.find(l => l.id === leaveId); 
    if (leave) { 
      updateLeave(leaveId, { status: 'Approved' }); 
       
      // Find employee email and reduce balance 
      const leaveKey = leave.leaveType.toLowerCase().replace(' ', ''); 
      updateEmployeeLeaveBalance(leave.employeeEmail, leave.leaveType, leave.days, true); 
       
      loadData(); 
      loadEmployees(); // ADDED
    } 
  }; 
 
  const handleReject = (leaveId) => { 
    const leave = leaves.find(l => l.id === leaveId); 
    if (leave) { 
      updateLeave(leaveId, { status: 'Rejected' }); 
      loadData(); 
    } 
  }; 
 
  const handleLogout = () => { 
    logout(); 
    navigate('/login'); 
  }; 
 
  const pendingLeaves = leaves.filter(l => l.status === 'Pending'); 

  // ADDED: Search employees
  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    employee.id.toLowerCase().includes(searchEmployee.toLowerCase()) ||
    employee.email.toLowerCase().includes(searchEmployee.toLowerCase())
  );
 
  return ( 
    <div className="admin-page"> 
      <nav> 
        <h1>Admin Dashboard</h1> 
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
          <h2>Leave Management Statistics</h2> 
 
          <div className="stats-container"> 
            <div className="stat-card"> 
              <h3>Total Requests</h3> 
              <div className="number">{statistics.total}</div> 
            </div> 
            <div className="stat-card"> 
              <h3>Pending</h3> 
              <div className="number">{statistics.pending}</div> 
            </div> 
            <div className="stat-card"> 
              <h3>Approved</h3> 
              <div className="number">{statistics.approved}</div> 
            </div> 
            <div className="stat-card"> 
              <h3>Rejected</h3> 
              <div className="number">{statistics.rejected}</div> 
            </div> 
          </div> 

          {/* ================================================= */}
          {/* ADDED: EMPLOYEE OVERVIEW                          */}
          {/* ================================================= */}

          <div className="employee-section">

            <div className="employee-section-header">
              <div>
                <h2>👥 Employee Overview</h2>
                <p>Manage and monitor all employees</p>
              </div>

              <div className="employee-count">
                <strong>{employees.length}</strong>
                <span>Employees</span>
              </div>
            </div>

            <div className="employee-search">
              🔍
              <input
                type="text"
                placeholder="Search employee by name, ID or email..."
                value={searchEmployee}
                onChange={(e) => setSearchEmployee(e.target.value)}
              />
            </div>

            <div className="employee-grid">

              {filteredEmployees.map((employee) => {

                const employeeLeaves = leaves.filter(
                  leave => leave.employeeId === employee.id
                );

                const approvedLeaves = employeeLeaves.filter(
                  leave => leave.status === 'Approved'
                );

                const pendingEmployeeLeaves = employeeLeaves.filter(
                  leave => leave.status === 'Pending'
                );

                const totalLeave =
                  employee.leaveBalance.casual +
                  employee.leaveBalance.sick +
                  employee.leaveBalance.earned;

                const usedLeave = approvedLeaves.reduce(
                  (total, leave) => total + Number(leave.days || 0),
                  0
                );

                const usage =
                  totalLeave > 0
                    ? Math.min((usedLeave / totalLeave) * 100, 100)
                    : 0;

                return (
                  <div className="employee-card" key={employee.id}>

                    <div className="employee-card-top">

                      <div className="employee-avatar">
                        {employee.name.charAt(0).toUpperCase()}
                      </div>

                      <div className="employee-main-info">
                        <h3>{employee.name}</h3>
                        <span>{employee.id}</span>
                      </div>

                      <div className="active-badge">
                        ● Active
                      </div>

                    </div>

                    <p className="employee-email">
                      ✉ {employee.email}
                    </p>

                    <div className="leave-balance-title">
                      Leave Balance
                    </div>

                    <div className="employee-balance">

                      <div className="balance-item casual-balance">
                        <span>Casual</span>
                        <strong>{employee.leaveBalance.casual}</strong>
                        <small>days</small>
                      </div>

                      <div className="balance-item sick-balance">
                        <span>Sick</span>
                        <strong>{employee.leaveBalance.sick}</strong>
                        <small>days</small>
                      </div>

                      <div className="balance-item earned-balance">
                        <span>Earned</span>
                        <strong>{employee.leaveBalance.earned}</strong>
                        <small>days</small>
                      </div>

                    </div>

                    <div className="leave-usage">

                      <div className="usage-header">
                        <span>Leave Usage</span>
                        <strong>{Math.round(usage)}%</strong>
                      </div>

                      <div className="usage-bar">
                        <div
                          className="usage-progress"
                          style={{ width: `${usage}%` }}
                        ></div>
                      </div>

                    </div>

                    <div className="employee-mini-stats">

                      <div>
                        <strong>{employeeLeaves.length}</strong>
                        <span>Total</span>
                      </div>

                      <div>
                        <strong>{pendingEmployeeLeaves.length}</strong>
                        <span>Pending</span>
                      </div>

                      <div>
                        <strong>{approvedLeaves.length}</strong>
                        <span>Approved</span>
                      </div>

                    </div>

                    <button
                      className="employee-details-button"
                      onClick={() => setSelectedEmployee(employee)}
                    >
                      View Employee Details →
                    </button>

                  </div>
                );
              })}

            </div>

            {filteredEmployees.length === 0 && (
              <div className="no-employees">
                <div>🔍</div>
                <h3>No Employee Found</h3>
                <p>Try searching with another name, ID or email.</p>
              </div>
            )}

          </div>

          {/* ================================================= */}
          {/* ADDED: EMPLOYEE DETAILS POPUP                    */}
          {/* ================================================= */}

          {selectedEmployee && (
            <div
              className="employee-modal-overlay"
              onClick={() => setSelectedEmployee(null)}
            >

              <div
                className="employee-modal"
                onClick={(e) => e.stopPropagation()}
              >

                <button
                  className="modal-close"
                  onClick={() => setSelectedEmployee(null)}
                >
                  ×
                </button>

                <div className="modal-profile">

                  <div className="modal-avatar">
                    {selectedEmployee.name.charAt(0).toUpperCase()}
                  </div>

                  <h2>{selectedEmployee.name}</h2>

                  <p>{selectedEmployee.id}</p>

                  <span>{selectedEmployee.email}</span>

                </div>

                <h3>Leave Balance</h3>

                <div className="modal-balances">

                  <div>
                    <span>Casual Leave</span>
                    <strong>
                      {selectedEmployee.leaveBalance.casual}
                    </strong>
                    <small>days available</small>
                  </div>

                  <div>
                    <span>Sick Leave</span>
                    <strong>
                      {selectedEmployee.leaveBalance.sick}
                    </strong>
                    <small>days available</small>
                  </div>

                  <div>
                    <span>Earned Leave</span>
                    <strong>
                      {selectedEmployee.leaveBalance.earned}
                    </strong>
                    <small>days available</small>
                  </div>

                </div>

                <h3 className="modal-history-title">
                  Leave History
                </h3>

                <div className="modal-history">

                  {leaves.filter(
                    leave => leave.employeeId === selectedEmployee.id
                  ).length === 0 ? (

                    <p className="no-history">
                      No leave requests yet.
                    </p>

                  ) : (

                    leaves
                      .filter(
                        leave => leave.employeeId === selectedEmployee.id
                      )
                      .map(leave => (

                        <div
                          className="history-item"
                          key={leave.id}
                        >

                          <div>
                            <strong>{leave.leaveType}</strong>
                            <span>
                              {leave.days} day(s)
                            </span>
                          </div>

                          <span
                            className={`history-status ${leave.status.toLowerCase()}`}
                          >
                            {leave.status}
                          </span>

                        </div>

                      ))

                  )}

                </div>

              </div>

            </div>
          )}
  
          <h3 style={{ marginTop: '2rem' }}>All Leave Requests</h3> 
  
          <div className="table-container"> 
            <table> 
              <thead> 
                <tr> 
                  <th>Employee</th> 
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
                    <td colSpan="8" style={{ textAlign: 'center' }}> 
                      No leave requests found 
                    </td> 
                  </tr> 
                ) : ( 
                  leaves.map((leave) => ( 
                    <tr key={leave.id}> 
                      <td>{leave.employeeName}</td> 
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
                            <> 
                              <button   
                                className="success" 
                                onClick={() => handleApprove(leave.id)} 
                                data-testid="approve-leave" 
                              > 
                                Approve 
                              </button> 
                              <button   
                                className="danger" 
                                onClick={() => handleReject(leave.id)} 
                                data-testid="reject-leave" 
                              > 
                                Reject 
                              </button> 
                            </> 
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
        </div> 
      </div> 
    </div> 
  );  
};  
  
export default AdminDashboard;