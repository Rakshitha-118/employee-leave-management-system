export const validateEmail = (email) => {

  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return re.test(email);

};

export const validateLeaveForm = (formData, leaveBalance) => {

  const errors = {};

  if (!formData.leaveType || formData.leaveType === '') {

    errors.leaveType = 'Leave type is required';

  }

  if (!formData.startDate) {

    errors.startDate = 'Start date is required';

  }

  if (!formData.endDate) {

    errors.endDate = 'End date is required';

  }

  if (!formData.reason || formData.reason.trim() === '') {

    errors.reason = 'Reason is required';

  }

  if (formData.startDate && formData.endDate) {

    const start = new Date(formData.startDate);

    const end = new Date(formData.endDate);

    if (end < start) {

      errors.endDate = 'End date cannot be before start date';

    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    if (start < today) {

      errors.startDate = 'Start date cannot be in the past';

    }

    if (end < today) {

      errors.endDate = 'End date cannot be in the past';

    }

  }

  if (formData.startDate && formData.endDate) {

    const start = new Date(formData.startDate);

    const end = new Date(formData.endDate);

    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const leaveType = formData.leaveType.toLowerCase().replace(/\s+leave$/, '').trim();

    const balance = leaveBalance[leaveType] || 0;

    if (days > balance) {

      errors.days = `You only have ${balance} days of ${formData.leaveType} available`;

    }

  }

  return errors;

};

export const calculateLeaveDays = (startDate, endDate) => {

  if (!startDate || !endDate) return 0;

  const start = new Date(startDate);

  const end = new Date(endDate);

  return Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

};

export const formatDate = (dateString) => {

  const date = new Date(dateString);

  return date.toLocaleDateString('en-US', { 

    year: 'numeric', 

    month: 'short', 

    day: 'numeric' 

  });

};

export const validateLogin = (email, password) => {

  const errors = {};

  if (!email || email.trim() === '') {

    errors.email = 'Email is required';

  } else if (!validateEmail(email)) {

    errors.email = 'Invalid email format';

  }

  if (!password || password === '') {

    errors.password = 'Password is required';

  }

  return errors;

};