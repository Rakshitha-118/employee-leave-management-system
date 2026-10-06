// Initialize localStorage with demo data
export const initializeStorage = () => {
  if (!localStorage.getItem('leaves')) {
    localStorage.setItem('leaves', JSON.stringify([]));
  }

  if (!localStorage.getItem('employees')) { 
  const employees = { 

    'employee@test.com': { 
      email: 'employee@test.com', 
      password: 'Employee@123', 
      name: 'John Doe', 
      id: 'EMP001', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee2@test.com': { 
      email: 'employee2@test.com', 
      password: 'Employee@123', 
      name: 'Priya Sharma', 
      id: 'EMP002', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee3@test.com': { 
      email: 'employee3@test.com', 
      password: 'Employee@123', 
      name: 'Rahul Kumar', 
      id: 'EMP003', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee4@test.com': { 
      email: 'employee4@test.com', 
      password: 'Employee@123', 
      name: 'Sneha Rao', 
      id: 'EMP004', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee5@test.com': { 
      email: 'employee5@test.com', 
      password: 'Employee@123', 
      name: 'Arjun Shetty', 
      id: 'EMP005', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee6@test.com': { 
      email: 'employee6@test.com', 
      password: 'Employee@123', 
      name: 'Ananya Nair', 
      id: 'EMP006', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee7@test.com': { 
      email: 'employee7@test.com', 
      password: 'Employee@123', 
      name: 'Karthik Gowda', 
      id: 'EMP007', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee8@test.com': { 
      email: 'employee8@test.com', 
      password: 'Employee@123', 
      name: 'Divya Shetty', 
      id: 'EMP008', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee9@test.com': { 
      email: 'employee9@test.com', 
      password: 'Employee@123', 
      name: 'Vivek Bhat', 
      id: 'EMP009', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    },

    'employee10@test.com': { 
      email: 'employee10@test.com', 
      password: 'Employee@123', 
      name: 'Neha Pai', 
      id: 'EMP010', 
      role: 'employee', 
      leaveBalance: { 
        casual: 10, 
        sick: 10, 
        earned: 15 
      } 
    }

  }; 

  localStorage.setItem('employees', JSON.stringify(employees)); 
}

  if (!localStorage.getItem('admins')) {
    const admins = {
      'admin@test.com': {
        email: 'admin@test.com',
        password: 'Admin@123',
        name: 'Admin User',
        role: 'admin'
      }
    };
    localStorage.setItem('admins', JSON.stringify(admins));
  }
};

// Leave operations
export const addLeave = (leave) => {
  const leaves = JSON.parse(localStorage.getItem('leaves') || '[]');
  const newLeave = {
    ...leave,
    id: Date.now().toString()
  };
  leaves.push(newLeave);
  localStorage.setItem('leaves', JSON.stringify(leaves));
  return newLeave;
};

export const getLeaves = () => {
  return JSON.parse(localStorage.getItem('leaves') || '[]');
};

export const getLeaveById = (id) => {
  const leaves = getLeaves();
  return leaves.find(leave => leave.id === id);
};

export const updateLeave = (id, updates) => {
  const leaves = getLeaves();
  const index = leaves.findIndex(leave => leave.id === id);
  if (index !== -1) {
    leaves[index] = { ...leaves[index], ...updates };
    localStorage.setItem('leaves', JSON.stringify(leaves));
  }
  return leaves[index];
};

export const deleteLeave = (id) => {
  const leaves = getLeaves();
  const filtered = leaves.filter(leave => leave.id !== id);
  localStorage.setItem('leaves', JSON.stringify(filtered));
};

export const getEmployeeLeaves = (employeeId) => {
  const leaves = getLeaves();
  return leaves.filter(leave => leave.employeeId === employeeId);
};

// Employee operations
export const getEmployee = (email) => {
  const employees = JSON.parse(localStorage.getItem('employees') || '{}');
  return employees[email];
};

export const updateEmployeeLeaveBalance = (email, leaveType, days, deduct = true) => {
  const employees = JSON.parse(localStorage.getItem('employees') || '{}');

  if (employees[email]) {
    let leaveKey;

    if (leaveType === 'Casual Leave') {
      leaveKey = 'casual';
    } else if (leaveType === 'Sick Leave') {
      leaveKey = 'sick';
    } else if (leaveType === 'Earned Leave') {
      leaveKey = 'earned';
    }

    if (leaveKey) {
      if (deduct) {
        employees[email].leaveBalance[leaveKey] -= days;
      } else {
        employees[email].leaveBalance[leaveKey] += days;
      }
    }

    localStorage.setItem('employees', JSON.stringify(employees));
  }
};

export const getEmployeeLeaveBalance = (email) => {
  const employee = getEmployee(email);
  return employee ? employee.leaveBalance : null;
};

// Authentication
export const login = (email, password) => {
  const employees = JSON.parse(localStorage.getItem('employees') || '{}');
  const admins = JSON.parse(localStorage.getItem('admins') || '{}');

  if (employees[email] && employees[email].password === password) {
    const user = {
      email: employees[email].email,
      name: employees[email].name,
      id: employees[email].id,
      role: 'employee'
    };
    return user;
  }

  if (admins[email] && admins[email].password === password) {
    const user = {
      email: admins[email].email,
      name: admins[email].name,
      role: 'admin'
    };
    return user;
  }

  return null;
};

export const logout = () => {
  localStorage.removeItem('loggedInUser');
};

export const getLoggedInUser = () => {
  const user = localStorage.getItem('loggedInUser');
  return user ? JSON.parse(user) : null;
};

export const setLoggedInUser = (user) => {
  localStorage.setItem('loggedInUser', JSON.stringify(user));
};

// Statistics
export const getLeaveStatistics = () => {
  const leaves = getLeaves();
  return {
    total: leaves.length,
    pending: leaves.filter(l => l.status === 'Pending').length,
    approved: leaves.filter(l => l.status === 'Approved').length,
    rejected: leaves.filter(l => l.status === 'Rejected').length
  };
};

export const clearAllData = () => {
  localStorage.clear();
  initializeStorage();
};
