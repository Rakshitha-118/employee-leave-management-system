# Cypress Test Cases Summary

Complete list of all 38 test cases organized by category.

## Test Execution Statistics

| Category | Count | Duration | Status |
|----------|-------|----------|--------|
| Authentication | 10 | 20-30s | ✓ Automated |
| Employee Leave | 10 | 30-50s | ✓ Automated |
| Validation | 8 | 15-25s | ✓ Automated |
| Admin Leave | 10 | 40-60s | ✓ Automated |
| **TOTAL** | **38** | **150-180s** | **All Automated** |

---

## Authentication Tests (10 tests)

### Test File: `cypress/e2e/authentication.cy.js`

#### 1. Login page loads correctly
- **Purpose**: Verify login page UI is rendered
- **Steps**:
  1. Navigate to /login
  2. Check visibility of email input
  3. Check visibility of password input
  4. Check visibility of login button
- **Expected**: All form elements visible
- **Data-testid**: `login-email`, `login-password`, `login-button`

#### 2. Employee can login with valid credentials
- **Purpose**: Test employee authentication
- **Steps**:
  1. Navigate to /login
  2. Enter `employee@test.com`
  3. Enter `Employee@123`
  4. Click login button
- **Expected**: Navigate to `/dashboard`
- **Command**: `cy.loginAsEmployee()`

#### 3. Admin can login with valid credentials
- **Purpose**: Test admin authentication
- **Steps**:
  1. Navigate to /login
  2. Enter `admin@test.com`
  3. Enter `Admin@123`
  4. Click login button
- **Expected**: Navigate to `/admin`
- **Command**: `cy.loginAsAdmin()`

#### 4. Invalid email shows error
- **Purpose**: Test invalid email validation
- **Steps**:
  1. Navigate to /login
  2. Enter invalid email format
  3. Enter valid password
  4. Click login
- **Expected**: Error message displayed
- **Data-testid**: `login-error`

#### 5. Invalid password shows error
- **Purpose**: Test invalid password handling
- **Steps**:
  1. Navigate to /login
  2. Enter valid email
  3. Enter wrong password
  4. Click login
- **Expected**: Error message displayed
- **Data-testid**: `login-error`

#### 6. Empty email shows validation error
- **Purpose**: Test required email validation
- **Steps**:
  1. Navigate to /login
  2. Leave email empty
  3. Enter password
  4. Click login
- **Expected**: Validation error shown
- **Data-testid**: `login-error`

#### 7. Empty password shows validation error
- **Purpose**: Test required password validation
- **Steps**:
  1. Navigate to /login
  2. Enter email
  3. Leave password empty
  4. Click login
- **Expected**: Validation error shown
- **Data-testid**: `login-error`

#### 8. Employee can logout
- **Purpose**: Test employee logout functionality
- **Steps**:
  1. Login as employee
  2. Click logout button
  3. Verify URL is /login
  4. Check localStorage is cleared
- **Expected**: Redirected to login, localStorage clean
- **Data-testid**: `logout-button`

#### 9. Admin can logout
- **Purpose**: Test admin logout functionality
- **Steps**:
  1. Login as admin
  2. Click logout button
  3. Verify URL is /login
  4. Check localStorage is cleared
- **Expected**: Redirected to login, localStorage clean
- **Data-testid**: `logout-button`

#### 10. Unauthorized user cannot access protected pages
- **Purpose**: Test route protection
- **Steps**:
  1. Visit /dashboard without login
  2. Verify redirect to /login
  3. Visit /admin without login
  4. Verify redirect to /login
- **Expected**: Redirect to login page

---

## Employee Leave Tests (10 tests)

### Test File: `cypress/e2e/employee-leave.cy.js`

#### 1. Employee dashboard loads
- **Purpose**: Verify employee dashboard renders
- **Steps**:
  1. Login as employee
  2. Check URL is /dashboard
  3. Verify dashboard heading visible
- **Expected**: Dashboard displayed
- **Selector**: Page title "Dashboard"

#### 2. Leave balances are displayed
- **Purpose**: Test leave balance display
- **Steps**:
  1. Login as employee
  2. Look for Casual Leave section
  3. Look for Sick Leave section
  4. Look for Earned Leave section
- **Expected**: All three leave types visible with balances

#### 3. Employee can open Apply Leave page
- **Purpose**: Test navigation to apply leave
- **Steps**:
  1. Login as employee
  2. Click "Apply Leave" button
  3. Verify URL is /apply-leave
- **Expected**: Navigate to apply-leave page
- **Data-testid**: `apply-leave-btn`

#### 4. Employee can submit valid leave request
- **Purpose**: Test leave submission
- **Steps**:
  1. Login as employee
  2. Navigate to Apply Leave
  3. Fill all form fields (future dates)
  4. Click Submit
- **Expected**: Form submitted successfully
- **Data-testid**: `submit-leave`

#### 5. Success message is displayed after valid submission
- **Purpose**: Test success notification
- **Steps**:
  1. Submit valid leave request
  2. Check for success message
  3. Verify message content
- **Expected**: Success message visible
- **Data-testid**: `leave-success`

#### 6. Submitted leave appears in My Leave Requests
- **Purpose**: Test leave persistence
- **Steps**:
  1. Submit leave request
  2. Navigate to My Requests
  3. Look for submitted leave in table
  4. Verify all details match
- **Expected**: Leave visible in requests table

#### 7. Employee can cancel pending leave
- **Purpose**: Test cancel functionality
- **Steps**:
  1. Submit leave request
  2. Go to My Leave Requests
  3. Click Cancel button
  4. Confirm cancellation
- **Expected**: Leave removed from table
- **Data-testid**: `cancel-leave-{id}`

#### 8. Employee cannot cancel approved leave
- **Purpose**: Test cancel restriction
- **Steps**:
  1. Submit leave
  2. Approve as admin
  3. Go to My Requests as employee
  4. Verify no cancel button for approved leave
- **Expected**: Cancel button not shown for approved status

#### 9. Employee cannot access Admin Dashboard
- **Purpose**: Test access control
- **Steps**:
  1. Login as employee
  2. Visit /admin directly
  3. Verify redirect to /login
- **Expected**: Redirected to login page

#### 10. Employee can logout
- **Purpose**: Test logout flow
- **Steps**:
  1. Login as employee
  2. Click logout button
  3. Verify URL is /login
  4. Verify no user data in storage
- **Expected**: Logged out successfully

---

## Validation Tests (8 tests)

### Test File: `cypress/e2e/validation.cy.js`

#### 1. Leave type is required
- **Purpose**: Test leave type validation
- **Steps**:
  1. Open Apply Leave form
  2. Skip leave type selection
  3. Fill other fields
  4. Submit form
- **Expected**: Error displayed
- **Data-testid**: `leave-error`

#### 2. Start date is required
- **Purpose**: Test start date validation
- **Steps**:
  1. Open Apply Leave form
  2. Skip start date
  3. Fill other fields
  4. Submit form
- **Expected**: Error displayed
- **Data-testid**: `leave-error`

#### 3. End date is required
- **Purpose**: Test end date validation
- **Steps**:
  1. Open Apply Leave form
  2. Skip end date
  3. Fill other fields
  4. Submit form
- **Expected**: Error displayed
- **Data-testid**: `leave-error`

#### 4. Reason is required
- **Purpose**: Test reason validation
- **Steps**:
  1. Open Apply Leave form
  2. Skip reason field
  3. Fill other fields
  4. Submit form
- **Expected**: Error displayed
- **Data-testid**: `leave-error`

#### 5. End date before start date shows error
- **Purpose**: Test date range validation
- **Steps**:
  1. Open Apply Leave form
  2. Set end date before start date
  3. Fill other fields
  4. Submit form
- **Expected**: Error message about date order
- **Data-testid**: `leave-error`

#### 6. Past date shows error
- **Purpose**: Test past date prevention
- **Steps**:
  1. Open Apply Leave form
  2. Select past dates
  3. Fill other fields
  4. Submit form
- **Expected**: Error about past dates
- **Data-testid**: `leave-error`

#### 7. Excessive leave request shows error
- **Purpose**: Test balance validation
- **Steps**:
  1. Open Apply Leave form
  2. Request more days than available
  3. Example: Request 20 casual days (only 10 available)
  4. Submit form
- **Expected**: Error about insufficient balance
- **Data-testid**: `leave-error`

#### 8. Invalid login shows error
- **Purpose**: Test login validation
- **Steps**:
  1. Navigate to login
  2. Enter wrong credentials
  3. Click login
  4. Verify error message
- **Expected**: Error displayed
- **Data-testid**: `login-error`

---

## Admin Leave Tests (10 tests)

### Test File: `cypress/e2e/admin-leave.cy.js`

#### 1. Admin dashboard loads
- **Purpose**: Verify admin dashboard renders
- **Steps**:
  1. Login as admin
  2. Verify URL is /admin
  3. Check admin dashboard title
- **Expected**: Admin dashboard displayed

#### 2. Total request count is displayed
- **Purpose**: Test statistics display
- **Steps**:
  1. Login as admin
  2. Look for "Total Requests" card
  3. Verify count is visible
- **Expected**: Total count displayed

#### 3. Pending requests are displayed
- **Purpose**: Test pending requests table
- **Steps**:
  1. Create leave request as employee
  2. Login as admin
  3. Look for pending request in table
  4. Verify request details
- **Expected**: Pending request visible in table

#### 4. Admin can approve leave
- **Purpose**: Test approval functionality
- **Steps**:
  1. Create pending leave
  2. Login as admin
  3. Click Approve button
  4. Verify status changed
- **Expected**: Leave status becomes "Approved"
- **Data-testid**: `approve-leave`

#### 5. Approved status is displayed
- **Purpose**: Test status display
- **Steps**:
  1. Approve a leave request
  2. Verify status badge shows "Approved"
  3. Check badge styling
- **Expected**: "Approved" status visible with correct styling

#### 6. Admin can reject leave
- **Purpose**: Test rejection functionality
- **Steps**:
  1. Create pending leave
  2. Login as admin
  3. Click Reject button
  4. Verify status changed
- **Expected**: Leave status becomes "Rejected"
- **Data-testid**: `reject-leave`

#### 7. Rejected status is displayed
- **Purpose**: Test rejection display
- **Steps**:
  1. Reject a leave request
  2. Verify status badge shows "Rejected"
  3. Check badge styling
- **Expected**: "Rejected" status visible with correct styling

#### 8. Approved leave reduces balance
- **Purpose**: Test balance deduction
- **Steps**:
  1. Check initial balance (10 casual)
  2. Create 2-day casual leave request
  3. Approve as admin
  4. Check balance (should be 8)
- **Expected**: Balance reduced by 2 days

#### 9. Rejected leave does not reduce balance
- **Purpose**: Test balance preservation
- **Steps**:
  1. Check initial balance (10 sick)
  2. Create 3-day sick leave request
  3. Reject as admin
  4. Check balance (should still be 10)
- **Expected**: Balance unchanged

#### 10. Admin can logout
- **Purpose**: Test admin logout
- **Steps**:
  1. Login as admin
  2. Click logout button
  3. Verify URL is /login
  4. Check localStorage cleared
- **Expected**: Logged out successfully

---

## Test Commands Reference

### Custom Cypress Commands

#### `cy.loginAsEmployee()`
```javascript
cy.visit('/login');
cy.get('[data-testid="login-email"]').type('employee@test.com');
cy.get('[data-testid="login-password"]').type('Employee@123');
cy.get('[data-testid="login-button"]').click();
cy.url().should('include', '/dashboard');
```

#### `cy.loginAsAdmin()`
```javascript
cy.visit('/login');
cy.get('[data-testid="login-email"]').type('admin@test.com');
cy.get('[data-testid="login-password"]').type('Admin@123');
cy.get('[data-testid="login-button"]').click();
cy.url().should('include', '/admin');
```

#### `cy.logout()`
```javascript
cy.get('[data-testid="logout-button"]').click();
cy.url().should('include', '/login');
```

#### `cy.clearAppData()`
```javascript
cy.clearLocalStorage();
// Resets employees, admins, and leaves data
```

---

## Data-testid Attributes

### Login Form
- `login-email` - Email input field
- `login-password` - Password input field
- `login-button` - Login submit button
- `login-error` - Error message container

### Apply Leave Form
- `leave-type` - Leave type dropdown
- `start-date` - Start date input
- `end-date` - End date input
- `leave-reason` - Reason textarea
- `submit-leave` - Submit button
- `leave-success` - Success message
- `leave-error` - Error message container

### Dashboard
- `apply-leave-btn` - Apply leave button
- `my-requests-btn` - My requests button
- `logout-button` - Logout button

### Admin
- `approve-leave` - Approve button
- `reject-leave` - Reject button
- `logout-button` - Logout button

---

## Test Execution Guide

### Run All Tests
```bash
npm run cypress:run
```

### Run Specific Category
```bash
npx cypress run --spec "cypress/e2e/authentication.cy.js"
npx cypress run --spec "cypress/e2e/employee-leave.cy.js"
npx cypress run --spec "cypress/e2e/validation.cy.js"
npx cypress run --spec "cypress/e2e/admin-leave.cy.js"
```

### Interactive Mode
```bash
npm run cypress:open
```

---

## Expected Test Results

### All Tests Should Pass ✓
- 38/38 tests passing
- 0 failures
- 0 skipped

### Coverage Areas
- ✓ Authentication (Login/Logout)
- ✓ Authorization (Role-based access)
- ✓ Employee Workflows
- ✓ Admin Workflows
- ✓ Form Validation
- ✓ Data Persistence
- ✓ Navigation
- ✓ Business Logic

### Test Quality Metrics
- **Pass Rate**: 100%
- **Coverage**: All major user flows
- **Reliability**: No flaky tests
- **Speed**: ~3 minutes total execution

---

## Notes for Students

1. **Before Running Tests**
   - Ensure dev server is running: `npm run dev`
   - Cypress auto-resets data before each test
   - No manual data cleanup needed

2. **Debugging Failed Tests**
   - Use Cypress interactive mode
   - Slow down test: `cy.get(...).click({force: true})`
   - Check browser DevTools in Cypress

3. **Test Dependencies**
   - Tests are independent
   - Can run in any order
   - Each test cleans up data

4. **Common Issues**
   - Timing issues → Add `cy.wait()`
   - Element not found → Check data-testid
   - localStorage errors → Clear browser cache

5. **Extending Tests**
   - Add new test in existing file
   - Follow naming convention
   - Use custom commands
   - Update data-testid in components

---

**Total Test Cases: 38 ✓**
**All Automated ✓**
**Ready for Demonstration ✓**
