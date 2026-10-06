import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { login as loginUser } from '../utils/localStorage';
import { validateLogin } from '../utils/validation';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    setGeneralError('');

    // Validate inputs
    const validationErrors = validateLogin(email, password);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Try to login
    const user = loginUser(email, password);
    if (user) {
      login(user);
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } else {
      setGeneralError('Invalid email or password');
    }
  };

  return (
    <div className="modern-login-page">

      {/* LEFT SIDE */}
      <div className="login-showcase">

        <div className="brand-section">
          <div className="brand-logo">🏢</div>

          <div>
            <h1>ELMS</h1>
            <span>Employee Leave Management System</span>
          </div>
        </div>

        <div className="showcase-content">

          <span className="showcase-tag">
            ✨ SMART • SIMPLE • SECURE
          </span>

          <h2>
            Manage your leave.
            <br />
            <span>Work with ease.</span>
          </h2>

          <p>
            A simple and efficient platform to manage leave
            requests, balances and approvals in one place.
          </p>

          <div className="login-feature-list">

            <div className="login-feature">
              <div className="feature-icon">📅</div>
              <div>
                <strong>Easy Leave Management</strong>
                <span>Apply and track your leave requests</span>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">📊</div>
              <div>
                <strong>Real-Time Overview</strong>
                <span>Monitor balances and request status</span>
              </div>
            </div>

            <div className="login-feature">
              <div className="feature-icon">🔐</div>
              <div>
                <strong>Secure Access</strong>
                <span>Separate employee and admin access</span>
              </div>
            </div>

          </div>

        </div>

        <div className="showcase-footer">
          <span>© 2026 ELMS</span>
          <span>Employee Portal</span>
        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="login-panel">

        <div className="login-card">

          <div className="login-card-header">

            <div className="login-mobile-logo">
              🔐
            </div>

            <h2>Welcome Back!</h2>

            <p>
              Sign in to continue to your account
            </p>

          </div>

          {generalError && (
            <div
              className="alert error"
              data-testid="login-error"
            >
              {generalError}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="modern-form-group">

              <label htmlFor="email">
                Email Address
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  ✉
                </span>

                <input
                  type="email"
                  id="email"
                  data-testid="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />

              </div>

              {errors.email && (
                <div
                  className="alert error"
                  style={{
                    marginTop: '0.5rem',
                    marginBottom: 0
                  }}
                >
                  {errors.email}
                </div>
              )}

            </div>

            <div className="modern-form-group">

              <label htmlFor="password">
                Password
              </label>

              <div className="input-wrapper">

                <span className="input-icon">
                  🔒
                </span>

                <input
                  type="password"
                  id="password"
                  data-testid="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />

              </div>

              {errors.password && (
                <div
                  className="alert error"
                  style={{
                    marginTop: '0.5rem',
                    marginBottom: 0
                  }}
                >
                  {errors.password}
                </div>
              )}

            </div>

            <button
              type="submit"
              className="modern-login-button"
              data-testid="login-button"
            >
              Sign In
              <span>→</span>
            </button>

          </form>

          {/* DEMO ACCESS */}
          <div className="demo-access">

            <div className="demo-title">
              <span>🔑</span>
              Demo Access
            </div>

            <div className="demo-account">

              <div className="demo-account-icon employee-demo">
                👤
              </div>

              <div>
                <strong>Employee</strong>
                <small>
                  employee@test.com
                </small>
              </div>

            </div>

            <div className="demo-account">

              <div className="demo-account-icon admin-demo">
                🛡️
              </div>

              <div>
                <strong>Administrator</strong>
                <small>
                  admin@test.com
                </small>
              </div>

            </div>

            <p className="demo-password">
              Demo passwords: <strong>Employee@123</strong> / <strong>Admin@123</strong>
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;