describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.clearAppData();
  });

  it('1. Login page loads correctly', () => {
    cy.visit('/login');

    cy.get('[data-testid="login-email"]').should('be.visible');
    cy.get('[data-testid="login-password"]').should('be.visible');
    cy.get('[data-testid="login-button"]').should('be.visible');
  });

  it('2. Employee can login with valid credentials', () => {
    cy.loginAsEmployee();

    cy.url().should('include', '/dashboard');
  });

  it('3. Admin can login with valid credentials', () => {
    cy.loginAsAdmin();

    cy.url().should('include', '/admin');
  });

  it('4. Invalid email shows error', () => {
  cy.visit('/login');

  cy.get('[data-testid="login-email"]').type('invalid@test.com');
  cy.get('[data-testid="login-password"]').type('Employee@123');
  cy.get('[data-testid="login-button"]').click();

  cy.get('[data-testid="login-error"]')
    .should('be.visible')
    .and('contain', 'Invalid email or password');
});

  it('5. Invalid password shows error', () => {
    cy.visit('/login');

    cy.get('[data-testid="login-email"]').type('employee@test.com');
    cy.get('[data-testid="login-password"]').type('WrongPassword');
    cy.get('[data-testid="login-button"]').click();

    cy.get('[data-testid="login-error"]')
      .should('be.visible')
      .and('contain', 'Invalid email or password');
  });

  it('6. Empty email shows validation error', () => {
    cy.visit('/login');

    cy.get('[data-testid="login-password"]').type('Employee@123');
    cy.get('[data-testid="login-button"]').click();

    cy.contains('Email is required')
      .should('be.visible');
  });

  it('7. Empty password shows validation error', () => {
    cy.visit('/login');

    cy.get('[data-testid="login-email"]').type('employee@test.com');
    cy.get('[data-testid="login-button"]').click();

    cy.contains('Password is required')
      .should('be.visible');
  });

  it('8. Employee can logout', () => {
    cy.loginAsEmployee();

    cy.logout();

    cy.url().should('include', '/login');

    cy.window().then(win => {
      expect(win.localStorage.getItem('loggedInUser')).to.be.null;
    });
  });

  it('9. Admin can logout', () => {
    cy.loginAsAdmin();

    cy.logout();

    cy.url().should('include', '/login');

    cy.window().then(win => {
      expect(win.localStorage.getItem('loggedInUser')).to.be.null;
    });
  });

  it('10. Unauthorized user cannot access protected pages', () => {
    cy.visit('/dashboard');

    cy.url().should('include', '/login');
  });
});