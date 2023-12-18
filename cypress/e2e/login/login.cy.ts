/// <reference types="cypress" />

export function fillRegisterUserForm() {
    // Fill the form
    cy.get('input[name="name"]').should('be.visible').type('Test User');
    cy.get('input[name="phone"]').should('be.visible').type('1234567890');
    cy.get('input[name="email"]').should('be.visible').type('testusername@gmail.com');

    // search birthdate(without using react-day-picker) span with text
    cy.get('button[id="birth-date"]').click();

    // select date of today
    cy.get('button[name="day"]').should('be.visible').contains(new Date().getDate()).click(); // will select the date 1

    // select gender that uses a custom select any element containing text Feminine
    cy.get('button[name="gender"').should('be.visible').click();

    // slect option Feminine
    cy.get('p[id="F"]').click();

    // type country
    cy.get('input[name="country"]').should('be.visible').type('United States');

    // type state
    cy.get('input[name="state"]').should('be.visible').type('California');
}

export function registerComplete() {
    // fill the form
    fillRegisterUserForm();

    // fill password and confirm password with the same value
    cy.get('input[name="password"]').should('be.visible').type('123');
    cy.get('input[name="confirmPassword"]').should('be.visible').type('123');

    // submit the form
    cy.get('button[type="submit"]').should('be.visible').click();
}

context('Registration and Login', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/');
    });

    it('Possible to successfully register and mismatch password', () => {
        // Navigate to the registration page
        cy.visit('http://localhost:3000/register');

        // fill the form
        fillRegisterUserForm();

        // type password
        cy.get('input[name="password"]').should('be.visible').type('123');

        // type confirm password different from password
        cy.get('input[name="confirmPassword"]').should('be.visible').type('456');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        cy.get('p').contains("Passwords don't match!!!").should('be.visible');
    });

    it('Possible to successfully register and register again with same email', () => {
        // Navigate to the registration page
        cy.visit('http://localhost:3000/register');

        // fill the form
        fillRegisterUserForm();

        // fill password and confirm password with the same value
        cy.get('input[name="password"]').should('be.visible').type('123');
        cy.get('input[name="confirmPassword"]').should('be.visible').type('123');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        // check if the toast is visible
        cy.get('div').contains('User registered successfully').should('be.visible');

        cy.visit('http://localhost:3000/register');
        // fill the form
        fillRegisterUserForm();

        // fill password and confirm password with the same value
        cy.get('input[name="password"]').should('be.visible').type('123');
        cy.get('input[name="confirmPassword"]').should('be.visible').type('123');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        // check if the toast is visible
        cy.get('p').contains('User already registered').should('be.visible');
    });

    it('Possible to successfully register and login', () => {
        // Navigate to the registration page
        cy.visit('http://localhost:3000/register');

        // fill the form
        fillRegisterUserForm();

        // fill password and confirm password with the same value
        cy.get('input[name="password"]').should('be.visible').type('123');
        cy.get('input[name="confirmPassword"]').should('be.visible').type('123');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        // check if the toast is visible
        cy.get('div').contains('User registered successfully').should('be.visible');

        cy.visit('http://localhost:3000/');

        // fill the form
        cy.get('input[name="email"]').should('be.visible').type('testusername@gmail.com');
        cy.get('input[name="password"]').should('be.visible').type('123');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        // check if an element with text Current bookings is visible
        cy.get('span').contains('Current bookings').should('be.visible');
    });
});
