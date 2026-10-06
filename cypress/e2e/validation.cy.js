describe('Validation Tests', () => {
  beforeEach(() => {
    cy.clearAppData();
  });

  it('1. Leave type is required', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Test');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('2. Start date is required', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const nextDay = new Date(tomorrow);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="end-date"]').type(nextDayStr);
    cy.get('[data-testid="leave-reason"]').type('Test');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('3. End date is required', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="leave-reason"]').type('Test');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('4. Reason is required', () => {
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
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('5. End date before start date shows error', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    const yesterday = new Date(tomorrow);
    yesterday.setDate(yesterday.getDate() - 2);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(yesterdayStr);
    cy.get('[data-testid="leave-reason"]').type('Test');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('6. Past date shows error', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const dayBeforeYesterday = new Date(yesterday);
    dayBeforeYesterday.setDate(dayBeforeYesterday.getDate() - 1);
    const dayBeforeYesterdayStr = dayBeforeYesterday.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="start-date"]').type(dayBeforeYesterdayStr);
    cy.get('[data-testid="end-date"]').type(yesterdayStr);
    cy.get('[data-testid="leave-reason"]').type('Test');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('7. Excessive leave request shows error', () => {
    cy.loginAsEmployee();
    cy.get('[data-testid="apply-leave-btn"]').click();
    
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Request 20 days but only 10 casual leaves available
    const farFuture = new Date(tomorrow);
    farFuture.setDate(farFuture.getDate() + 19);
    const farFutureStr = farFuture.toISOString().split('T')[0];
    
    cy.get('[data-testid="leave-type"]').select('Casual Leave');
    cy.get('[data-testid="start-date"]').type(tomorrowStr);
    cy.get('[data-testid="end-date"]').type(farFutureStr);
    cy.get('[data-testid="leave-reason"]').type('Vacation');
    cy.get('[data-testid="submit-leave"]').click();
    
    cy.get('[data-testid="leave-error"]').should('be.visible');
  });

  it('8. Invalid login shows error', () => {
    cy.visit('/login');
    cy.get('[data-testid="login-email"]').type('wrong@email.com');
    cy.get('[data-testid="login-password"]').type('WrongPassword123');
    cy.get('[data-testid="login-button"]').click();
    
    cy.get('[data-testid="login-error"]').should('be.visible');
    cy.get('[data-testid="login-error"]').should('contain', 'Invalid');
  });
});
