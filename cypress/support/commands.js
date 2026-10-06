// Custom commands for testing

Cypress.Commands.add('loginAsEmployee', () => {
  cy.visit('/login');
  cy.get('[data-testid="login-email"]').clear().type('employee@test.com');
  cy.get('[data-testid="login-password"]').clear().type('Employee@123');
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('include', '/dashboard');
});

Cypress.Commands.add('loginAsAdmin', () => {
  cy.visit('/login');
  cy.get('[data-testid="login-email"]').clear().type('admin@test.com');
  cy.get('[data-testid="login-password"]').clear().type('Admin@123');
  cy.get('[data-testid="login-button"]').click();
  cy.url().should('include', '/admin');
});

Cypress.Commands.add('logout', () => {
  cy.get('[data-testid="logout-button"]').click();
  cy.url().should('include', '/login');
});

Cypress.Commands.add('clearAppData', () => {
  cy.clearLocalStorage();
  cy.window().then(win => {
    win.localStorage.setItem('employees', JSON.stringify({
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
      }
    }));
    win.localStorage.setItem('admins', JSON.stringify({
      'admin@test.com': {
        email: 'admin@test.com',
        password: 'Admin@123',
        name: 'Admin User',
        role: 'admin'
      }
    }));
    win.localStorage.setItem('leaves', JSON.stringify([]));
  });
});
