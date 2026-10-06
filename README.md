# Employee Leave Management System

A complete Employee Leave Management System built with React.js for college software testing project with comprehensive Cypress end-to-end testing.

## Problem Statement

Develop a web-based leave management system that allows employees to apply for leave and enables administrators to approve or reject leave requests. The system should maintain accurate leave balances and provide comprehensive leave tracking.

## Objectives

1. Create a functional leave management system with user authentication
2. Implement employee leave application and tracking features
3. Develop admin capabilities for leave approval/rejection
4. Maintain leave balance tracking and validation
5. Create comprehensive end-to-end test suite with Cypress
6. Ensure data persistence using localStorage
7. Implement proper route protection and access control

## Features

### Employee Features
- User authentication with demo credentials
- View personal leave balance (Casual, Sick, Earned)
- View pending, approved, and rejected leave requests
- Apply for leave with validation
- Cancel pending leave requests
- Automatic leave balance calculation
- Dashboard with leave statistics

### Admin Features
- Admin authentication
- View all employee leave requests
- Approve or reject leave requests
- View leave statistics and analytics
- Automatic leave balance deduction on approval
- Comprehensive leave management

### Common Features
- Secure login/logout functionality
- Protected routes based on user role
- Data persistence using localStorage
- Responsive design
- Form validation with error messages
- Success/error notifications

## Technology Stack

- **Frontend Framework**: React.js 18
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Data Storage**: LocalStorage
- **Testing Framework**: Cypress
- **Styling**: CSS3
- **Language**: JavaScript (ES6+)

## Project Structure

```
employee-leave-management-system/
├── src/
│   ├── components/
│   │   ├── Login.jsx
│   │   ├── EmployeeDashboard.jsx
│   │   ├── ApplyLeave.jsx
│   │   ├── MyLeaveRequests.jsx
│   │   ├── AdminDashboard.jsx
│   │   ├── ProtectedRoute.jsx
│   │   └── NotFound.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── utils/
│   │   ├── localStorage.js
│   │   └── validation.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── cypress/
│   ├── e2e/
│   │   ├── authentication.cy.js
│   │   ├── employee-leave.cy.js
│   │   ├── admin-leave.cy.js
│   │   └── validation.cy.js
│   ├── support/
│   │   ├── commands.js
│   │   └── e2e.js
│   └── cypress.config.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Steps

1. **Clone or extract the project**
   ```bash
   cd employee-leave-management-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Verify installation**
   ```bash
   npm list
   ```

## How to Run the Application

### Development Server

Start the Vite development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## How to Run Cypress Tests

### Open Cypress Test Runner (Interactive Mode)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner where you can:
- View all test files
- Run tests interactively
- Watch tests execute in real-time
- Debug failed tests

### Run All Tests (Headless Mode)

```bash
npm run cypress:run
```

This runs all tests in headless mode and displays results in the terminal.

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/authentication.cy.js"
```

## Demo Login Credentials

### Employee Account
- **Email**: `employee@test.com`
- **Password**: `Employee@123`

### Admin Account
- **Email**: `admin@test.com`
- **Password**: `Admin@123`

## Application Pages

### 1. Login Page (`/login`)
- Email and password input fields
- Form validation
- Error message display
- Demo credentials hint

### 2. Employee Dashboard (`/dashboard`)
- Employee name and ID display
- Leave balance for Casual, Sick, and Earned leave
- Pending, approved, and rejected leave statistics
- Navigation buttons to Apply Leave and View Requests

### 3. Apply Leave (`/apply-leave`)
- Leave type dropdown (Casual, Sick, Earned)
- Start date picker
- End date picker
- Reason text area
- Form validation
- Success/error messages
- Submit and Cancel buttons

### 4. My Leave Requests (`/my-requests`)
- Table displaying all employee leave requests
- Columns: Leave Type, Start Date, End Date, Days, Reason, Status, Action
- Cancel button for pending requests only
- Status badges with color coding

### 5. Admin Dashboard (`/admin`)
- Statistics cards: Total, Pending, Approved, Rejected
- Comprehensive leave requests table
- Columns: Employee, Leave Type, Start Date, End Date, Days, Reason, Status, Action
- Approve and Reject buttons for pending requests

### 6. Not Found (`/404`)
- 404 error page for invalid routes
- Navigation back to login

## Cypress Test Cases (30+ Tests)

### Authentication Tests (10 tests)
1. ✓ Login page loads correctly
2. ✓ Employee can login with valid credentials
3. ✓ Admin can login with valid credentials
4. ✓ Invalid email shows error
5. ✓ Invalid password shows error
6. ✓ Empty email shows validation error
7. ✓ Empty password shows validation error
8. ✓ Employee can logout
9. ✓ Admin can logout
10. ✓ Unauthorized user cannot access protected pages

### Employee Leave Tests (10 tests)
1. ✓ Employee dashboard loads
2. ✓ Leave balances are displayed
3. ✓ Employee can open Apply Leave page
4. ✓ Employee can submit valid leave request
5. ✓ Success message is displayed after submission
6. ✓ Submitted leave appears in My Leave Requests
7. ✓ Employee can cancel pending leave
8. ✓ Employee cannot cancel approved leave
9. ✓ Employee cannot access Admin Dashboard
10. ✓ Employee can logout

### Validation Tests (8 tests)
1. ✓ Leave type is required
2. ✓ Start date is required
3. ✓ End date is required
4. ✓ Reason is required
5. ✓ End date before start date shows error
6. ✓ Past date shows error
7. ✓ Excessive leave request shows error
8. ✓ Invalid login shows error

### Admin Leave Tests (10 tests)
1. ✓ Admin dashboard loads
2. ✓ Total request count is displayed
3. ✓ Pending requests are displayed
4. ✓ Admin can approve leave
5. ✓ Approved status is displayed
6. ✓ Admin can reject leave
7. ✓ Rejected status is displayed
8. ✓ Approved leave reduces balance
9. ✓ Rejected leave does not reduce balance
10. ✓ Admin can logout

**Total: 38 Cypress Test Cases**

## Testing Strategy

### Unit Testing Aspects
- Form validation functions
- Date calculation utilities
- Email format validation
- Leave balance calculations

### Integration Testing
- Authentication flow
- Route protection
- LocalStorage data management
- Leave request lifecycle

### End-to-End Testing (Cypress)
- Complete user workflows
- Employee leave application to approval
- Admin leave management
- Form validation and error handling
- Navigation and access control

## Leave Request Lifecycle

```
1. Employee applies for leave
   ↓
2. Leave saved as "Pending" status
   ↓
3. Admin reviews leave request
   ├─→ APPROVE: Status → "Approved", Balance reduced
   └─→ REJECT: Status → "Rejected", Balance unchanged
   ↓
4. Employee views updated leave status
   ↓
5. Employee cannot cancel approved/rejected leave
```

## Leave Balance Management

### Initial Balance
- Casual Leave: 10 days
- Sick Leave: 10 days
- Earned Leave: 15 days

### Balance Deduction
- Balance is deducted only when leave is **Approved**
- Balance is calculated based on actual days (inclusive)
- No balance deduction for rejected requests

### Validation Rules
- Cannot apply for leave exceeding available balance
- Cannot apply for past dates
- End date must be after or equal to start date
- All required fields must be filled

## Data Storage

### LocalStorage Keys
```javascript
{
  "employees": { /* Employee accounts and balances */ },
  "admins": { /* Admin accounts */ },
  "leaves": [ /* All leave requests */ ],
  "loggedInUser": { /* Currently logged-in user */ }
}
```

### Leave Request Object
```javascript
{
  id: "timestamp",
  employeeName: "John Doe",
  employeeId: "EMP001",
  leaveType: "Casual Leave",
  startDate: "2024-01-15",
  endDate: "2024-01-17",
  days: 3,
  reason: "Personal reasons",
  status: "Pending|Approved|Rejected"
}
```

## Expected Results

### Login Flow
- Valid credentials → Dashboard/Admin page
- Invalid credentials → Error message
- Unauthorized access → Redirected to login

### Leave Application
- Valid form → Success message → Appears in My Requests
- Invalid form → Error message → Form retained
- Exceeded balance → Validation error displayed

### Leave Approval
- Approve → Balance reduced → Status updated → Employee views change
- Reject → Balance unchanged → Status updated → Employee views change

### Logout
- All user data cleared from localStorage
- Redirected to login page
- Cannot access protected pages

## Browser Compatibility

- Chrome/Chromium (recommended)
- Firefox
- Edge
- Safari

## Accessibility Features

- Semantic HTML
- Proper label associations
- Error message announcements
- Keyboard navigation support
- Color contrast compliance

## Performance Considerations

- Efficient localStorage queries
- Minimal re-renders with React
- Client-side validation
- No external API calls

## Future Enhancements

1. **Database Integration**
   - Replace localStorage with MongoDB/PostgreSQL
   - Implement Node.js backend with Express

2. **Additional Features**
   - Email notifications for leave status
   - Employee search and filtering
   - Leave history export (PDF/Excel)
   - Advanced analytics and reports
   - Holiday calendar integration
   - Team member leave view

3. **Admin Enhancements**
   - Bulk leave operations
   - Leave policy management
   - Employee leave quota customization
   - Leave audit trail

4. **Security Improvements**
   - Password hashing (bcrypt)
   - JWT-based authentication
   - Role-based access control (RBAC)
   - Two-factor authentication

5. **UI/UX Improvements**
   - Dark mode support
   - Calendar view for leave planning
   - Real-time notifications
   - Mobile app version
   - Internationalization (i18n)

6. **Testing Enhancements**
   - Unit tests with Jest
   - Component testing with React Testing Library
   - Visual regression testing
   - Performance testing

## Troubleshooting

### Tests not running
- Clear localStorage: `cy.clearLocalStorage()`
- Restart dev server: `npm run dev`
- Clear Cypress cache: `npx cypress cache clear`

### Data not persisting
- Check browser localStorage settings
- Clear browser cache
- Ensure localStorage is not disabled

### Navigation issues
- Verify React Router configuration
- Check protected route implementation
- Ensure correct URL paths

### Validation not working
- Check validation functions in `utils/validation.js`
- Verify form input `data-testid` attributes
- Check browser console for errors

## Demo Walkthrough

1. **Start the application**: `npm run dev`
2. **Login as Employee**: Use employee@test.com / Employee@123
3. **View Dashboard**: Check leave balances
4. **Apply for Leave**: Click "Apply Leave" button
5. **Submit Request**: Fill form with future dates
6. **View Requests**: Click "My Leave Requests"
7. **Logout**: Click logout button
8. **Login as Admin**: Use admin@test.com / Admin@123
9. **Review Requests**: See pending leave requests
10. **Approve/Reject**: Test both approval and rejection
11. **Verify Balance**: Login as employee to check updated balance

## Running Tests Demo

```bash
# Open Cypress interactive mode
npm run cypress:open

# Select authentication.cy.js
# Run specific tests
# Watch test execution
```

## Learning Outcomes

Students will learn:
- React.js fundamentals and component lifecycle
- React Router for navigation and route protection
- Context API for state management
- LocalStorage API for data persistence
- Form validation and error handling
- Cypress end-to-end testing
- Web application security basics
- Software testing best practices
- UI/UX design principles
- Responsive web design

## Documentation References

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Cypress Documentation](https://docs.cypress.io)
- [MDN Web Docs](https://developer.mozilla.org)

## License

This project is created for educational purposes.

## Author

Developed as a comprehensive college software testing project.

## Support

For issues or questions, refer to:
1. Project documentation
2. Cypress test cases for usage examples
3. Component code comments
4. Console error messages

---

**Happy Testing! 🚀**
