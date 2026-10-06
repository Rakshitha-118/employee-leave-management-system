describe('Employee Leave Tests', () => {
  beforeEach(() => {
    cy.clearAppData();
  });

  it('1. Employee dashboard loads', () => {
  cy.loginAsEmployee();
  cy.url().should('include', '/dashboard');
  cy.contains('Welcome back 👋').should('be.visible');
});

  it('2. Leave balances are displayed', () => {
    cy.loginAsEmployee();
    cy.contains('Casual Leave').should('be.visible');
    cy.contains('Sick Leave').should('be.visible');
    cy.contains('Earned Leave').should('be.visible');
  });

  it('3. Employee can open Apply Leave page', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    cy.url().should('include', '/apply-leave');
  });

  it('4. Employee can submit valid leave request', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    // Get tomorrow's date
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Personal reasons');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-success"]').should('be.visible');
  });

  it('5. Success message is displayed after valid submission', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Sick Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Medical appointment');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-success"]').should('contain', 'submitted successfully');
  });

  it('6. Submitted leave appears in My Leave Requests', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Earned Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Vacation');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.url().should('include', '/my-requests');
    cy.contains('Earned Leave').should('be.visible');
    cy.contains('Pending').should('be.visible');
  });

  it('7. Employee can cancel pending leave', () => {
    // First, create a leave request
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Personal');
    cy.get('[data-testid="submit-leave"]').click();
    
    // Now cancel it
    cy.get('button[data-testid*="cancel-leave-"]').first().click();
    cy.on('window:confirm', () => true);
    
    // Verify it's deleted
    cy.contains('No leave requests found').should('be.visible');
  });

  it('8. Employee cannot cancel approved leave', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Sick Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Medical');
    cy.get('[data-testid="submit-leave"]').click();
    
    // Approve the leave as admin
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="approve-leave"]').first().click();
    
    // Go back to employee and check
    cy.logout();
    cy.loginAsEmployee();
    cy.get('[data-testid="my-requests-btn"]').click();
    
    // Should not see cancel button for approved leave
    cy.contains('Approved').should('be.visible');
    cy.get('button[data-testid*="cancel-leave-"]').should('not.exist');
  });

  it('9. Employee cannot access Admin Dashboard', () => {
    cy.loginAsEmployee();
    cy.visit('/admin');
    cy.url().should('include', '/login');
  });

  it('10. Employee can logout', () => {
    cy.loginAsEmployee();
    cy.logout();
    cy.url().should('include', '/login');
  });
});
