describe('Admin Leave Tests', () => {
  beforeEach(() => {
    cy.clearAppData();
  });

  it('1. Admin dashboard loads', () => {
    cy.loginAsAdmin();
    cy.contains('Admin Dashboard').should('be.visible');
  });

  it('2. Total request count is displayed', () => {
    cy.loginAsAdmin();
    cy.contains('Total Requests').should('be.visible');
  });

  it('3. Pending requests are displayed', () => {
    // Create a leave request first
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
    
    // Now check admin dashboard
    cy.logout();
    cy.loginAsAdmin();
    cy.contains('Pending').should('be.visible');
  });

  it('4. Admin can approve leave', () => {
    // Create a leave request
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
    
    // Approve as admin
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="approve-leave"]').click();
    
    // Verify approval
    cy.contains('Approved').should('be.visible');
  });

  it('5. Approved status is displayed', () => {
    // Create a leave request
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
    
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="approve-leave"]').click();
    
    cy.contains('Approved').should('be.visible');
  });

  it('6. Admin can reject leave', () => {
    // Create a leave request
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
    
    // Reject as admin
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="reject-leave"]').click();
    
    cy.contains('Rejected').should('be.visible');
  });

  it('7. Rejected status is displayed', () => {
    // Create a leave request
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
    
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="reject-leave"]').click();
    
    cy.contains('Rejected').should('be.visible');
  });

  it('8. Approved leave reduces balance', () => {
    // Get initial balance
    cy.loginAsEmployee();
    cy.contains('Casual Leave').parent().contains('10').should('be.visible');
    
    // Apply for leave
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
    
    // Approve as admin
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="approve-leave"]').click();
    
    // Check balance is reduced
    cy.logout();
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    cy.get('[data-testid="leave-type"]').should('contain', '(Available: 8)');
  });

  it('9. Rejected leave does not reduce balance', () => {
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
    
    // Reject as admin
    cy.logout();
    cy.loginAsAdmin();
    cy.get('[data-testid="reject-leave"]').click();
    
    // Check balance is NOT reduced
    cy.logout();
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    cy.get('[data-testid="leave-type"]').should('contain', '(Available: 10)');
  });

  it('10. Admin can logout', () => {
    cy.loginAsAdmin();
    cy.logout();
    cy.url().should('include', '/login');
  });
});
