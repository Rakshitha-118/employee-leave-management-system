# Quick Setup Guide

## Prerequisites

Before starting, ensure you have:
- **Node.js** v14 or higher ([Download](https://nodejs.org/))
- **npm** v6 or higher (comes with Node.js)
- A modern web browser (Chrome, Firefox, Edge, or Safari)
- A code editor (VS Code recommended)

## Step-by-Step Setup

### 1. Navigate to Project Directory

```bash
cd employee-leave-management-system
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- React.js 18
- React Router v6
- Vite (build tool)
- Cypress (testing framework)

**Expected output:**
```
added XXX packages in XX seconds
```

### 3. Verify Installation

```bash
npm list
```

Should show:
```
├── react@18.2.0
├── react-dom@18.2.0
├── react-router-dom@6.14.0
└── ... (other dependencies)
```

## Running the Application

### Start Development Server

```bash
npm run dev
```

**Output:**
```
  VITE v4.3.9  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

### Access the Application

Open your browser and navigate to:
```
http://localhost:5173
```

You should see the login page.

### Stop the Server

Press `Ctrl + C` in the terminal.

## Testing the Application

### Quick Test Flow (Manual)

1. **Login as Employee**
   - Email: `employee@test.com`
   - Password: `Employee@123`
   - Click Login

2. **View Dashboard**
   - Check leave balances
   - Note: Casual: 10, Sick: 10, Earned: 15

3. **Apply for Leave**
   - Click "Apply Leave" button
   - Select "Casual Leave"
   - Pick a future date for start and end
   - Enter reason
   - Click "Submit Leave"

4. **View Your Requests**
   - Click "My Leave Requests"
   - See your request with "Pending" status

5. **Logout**
   - Click "Logout"

6. **Login as Admin**
   - Email: `admin@test.com`
   - Password: `Admin@123`

7. **Approve the Leave**
   - See the pending leave request
   - Click "Approve"

8. **Verify**
   - Logout
   - Login as employee again
   - Check leave balance decreased by 2 days (Casual: 8)

### Automated Testing with Cypress

#### Option 1: Interactive Mode (Recommended for Learning)

```bash
npm run cypress:open
```

This opens the Cypress Test Runner with:
- **List of all test files** on the left
- **Test execution area** in the center
- **Browser developer tools** on the right

**To run tests:**
1. Click on any test file (e.g., `authentication.cy.js`)
2. Watch tests execute in real-time
3. See each assertion pass/fail
4. Debug failed tests immediately

#### Option 2: Headless Mode (CI/CD)

```bash
npm run cypress:run
```

This:
- Runs all tests without opening browser
- Shows results in terminal
- Generates screenshots if tests fail
- Better for automated testing

#### Option 3: Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/authentication.cy.js"
```

#### Option 4: Run Specific Test

```bash
npx cypress run --spec "cypress/e2e/validation.cy.js" --headless
```

## Building for Production

### Create Production Build

```bash
npm run build
```

Creates `dist/` folder with optimized files.

### Preview Production Build

```bash
npm run preview
```

Starts a local preview server for the production build.

## File Structure Overview

```
project-root/
├── src/
│   ├── components/         # React components
│   ├── context/           # React context (Auth)
│   ├── utils/             # Utilities (localStorage, validation)
│   ├── App.jsx            # Main app component
│   ├── main.jsx           # React entry point
│   └── index.css          # Global styles
│
├── cypress/
│   ├── e2e/               # End-to-end tests
│   │   ├── authentication.cy.js
│   │   ├── employee-leave.cy.js
│   │   ├── admin-leave.cy.js
│   │   └── validation.cy.js
│   ├── support/           # Cypress support files
│   │   ├── commands.js
│   │   └── e2e.js
│   └── cypress.config.js  # Cypress configuration
│
├── index.html             # HTML entry point
├── package.json           # Project dependencies
├── vite.config.js         # Vite configuration
├── cypress.config.js      # Cypress config
└── README.md             # Full documentation
```

## Troubleshooting

### Port Already in Use

If `5173` port is busy:

```bash
npm run dev -- --port 5174
```

### Tests Not Starting

**Solution 1:** Clear cache
```bash
npx cypress cache clear
npm run dev
npx cypress:open
```

**Solution 2:** Hard reset localStorage
```bash
# In browser DevTools Console:
localStorage.clear()
location.reload()
```

### Node Modules Issues

```bash
rm -rf node_modules package-lock.json
npm install
```

### Application Not Loading

1. Check if dev server is running
2. Open browser console (F12)
3. Look for error messages
4. Check terminal for server errors

## Common Commands Reference

```bash
# Development
npm run dev              # Start dev server

# Testing
npm run cypress:open    # Interactive Cypress
npm run cypress:run     # Run all tests headless

# Building
npm run build           # Production build
npm run preview         # Preview build

# Utilities
npm install             # Install dependencies
npm update              # Update dependencies
```

## Project Workflow for Testing

1. **Start Application**
   ```bash
   npm run dev
   ```

2. **Open Cypress in New Terminal**
   ```bash
   npm run cypress:open
   ```

3. **Select and Run Tests**
   - Click test file
   - Watch real-time execution
   - Debug as needed

4. **Make Changes**
   - Edit React components
   - Cypress hot-reloads
   - Tests re-run automatically

5. **Commit Changes**
   ```bash
   git add .
   git commit -m "message"
   git push
   ```

## Test Execution Timeline

Each test takes approximately:
- **Authentication tests**: 2-3 seconds per test
- **Employee tests**: 3-5 seconds per test
- **Admin tests**: 4-6 seconds per test
- **Validation tests**: 2-4 seconds per test

**Total suite**: ~150-180 seconds (2.5-3 minutes)

## Performance Tips

1. **Use latest Node.js version**
   ```bash
   node --version  # Should be v16+
   ```

2. **Close unnecessary applications**
   - Frees up system resources
   - Faster test execution

3. **Use SSD**
   - Faster file operations
   - Quicker test runs

## System Requirements

### Minimum
- OS: Windows/Mac/Linux
- RAM: 4 GB
- Disk: 1 GB free
- Browser: Any modern browser

### Recommended
- OS: Windows 10+/Mac 10.15+/Ubuntu 20.04+
- RAM: 8 GB
- Disk: 2 GB free
- Browser: Chrome 90+

## Testing Before Submission

**Checklist:**
- [ ] `npm install` succeeds
- [ ] `npm run dev` starts without errors
- [ ] App loads at `http://localhost:5173`
- [ ] Login works with demo credentials
- [ ] Employee flow works (apply, view, cancel)
- [ ] Admin flow works (approve, reject)
- [ ] `npm run cypress:run` passes all tests
- [ ] No console errors
- [ ] All features working as expected

## Demo Presentation Tips

1. **Start server first**
   ```bash
   npm run dev
   ```

2. **Open in full browser**
   - Makes demo easier to see

3. **Test employee flow**
   - Login → Apply → Approve → Check balance

4. **Explain code structure**
   - Components, routing, localStorage

5. **Show Cypress tests**
   - Open Cypress and run a test file
   - Explain assertions

6. **Discuss testing strategy**
   - 38 test cases covering all features
   - Validation, authentication, workflows

## Questions to Answer During Viva

1. **How is data stored?**
   - LocalStorage with JavaScript objects

2. **How are routes protected?**
   - ProtectedRoute component checks user role

3. **How is leave balance calculated?**
   - Inclusive of start and end dates

4. **How are tests structured?**
   - E2E tests using Cypress with custom commands

5. **What happens on approval?**
   - Status changes to "Approved" and balance decreases

6. **What validation is implemented?**
   - Required fields, date validation, balance check, email format

## Next Steps

1. Complete setup following this guide
2. Run application manually (test all features)
3. Run Cypress tests (verify all pass)
4. Review code and understand the flow
5. Prepare for viva/demonstration
6. Consider future enhancements

## Support Resources

- **Node.js Errors**: Check [nodejs.org](https://nodejs.org)
- **Cypress Help**: Visit [docs.cypress.io](https://docs.cypress.io)
- **React Help**: Check [react.dev](https://react.dev)
- **Terminal Issues**: Check commands and paths

---

**You're ready to go! Happy testing! 🎉**
