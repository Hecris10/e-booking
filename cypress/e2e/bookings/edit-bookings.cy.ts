/// <reference types="cypress" />

context('Edit bookings', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/register');
    });

    it('Creating two bookings, and attempt to overflow the dates of the second', () => {
        cy.visit('http://localhost:3000/register');
        // Register
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

        // fill password and confirm password with the same value
        cy.get('input[name="password"]').should('be.visible').type('123');
        cy.get('input[name="confirmPassword"]').should('be.visible').type('123');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        cy.visit('http://localhost:3000/');

        // fill the form
        cy.get('input[name="email"]').should('be.visible').type('testusername@gmail.com');
        cy.get('input[name="password"]').should('be.visible').type('123');

        // submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        // check if an element with text Current bookings is visible
        cy.get('span').contains('Stays').should('be.visible');

        // go to bookings tab getting button with id new
        cy.get('button[id="new"]').click();

        //select the first option by clikcingin the text
        cy.get('h1').contains('Copa Cabana Palace').click();

        // check if the popover is visible
        cy.get('div[id="select-places"').scrollTo('bottom');
        cy.get('p')
            .contains(
                'Facing Copacabana Beach, this refined art deco hotel from 1923 is 10 km from Santos Dumont Airport and 13 km from the iconic Christ the Redeemer statue.'
            )
            .should('be.visible');
        // check if the Select button is visible
        cy.get('button').contains('Select').should('be.visible').click();

        // check if the selected item is visible
        cy.get('h1').contains('Copa Cabana Palace').click();

        // scroll to the bottom of the page
        cy.get('article').scrollTo('bottom');

        // check if the price per day is right and visible
        // if the value is in dollar format, value is 1599

        cy.get('p[id="daily-price"]').contains('$1,599.00').should('be.visible');

        // select the range of dates for 2 days from tomorrow
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        const twoDaysFromTomorrow = new Date();
        twoDaysFromTomorrow.setDate(tomorrow.getDate() + 2);

        // select the first date
        cy.get('button[name="day"]:not(:disabled)').contains(tomorrow.getDate()).last().click();
        // select the last date
        cy.get('button[name="day"]:not(:disabled)')
            .contains(twoDaysFromTomorrow.getDate())
            .last()
            .click();

        // check if the total price is right and visible
        cy.get('p[id="daily-price"]').contains('$3,198.00').should('be.visible');

        // check if the button is visible
        cy.get('button').contains('Save').should('be.visible').click();

        // check fi the modal is visible
        cy.get('p').contains('Attention: You have 24 ').should('be.visible');

        // check if the button is visible and click
        cy.get('button').contains('Continue').should('be.visible').click();

        // check if the toast is visible
        cy.get('div').contains('Booking created successfully').should('be.visible');

        // chick if was redirected to the current bookings page
        cy.get('span').contains('Stays').should('be.visible');
        // check if the booking is visible
        cy.get('h1').contains('Copa Cabana Palace').should('be.visible');

        // go to bookings tab getting button with id new
        cy.get('button[id="new"]').click();

        cy.get('h1').contains('Yuca Valley').click();

        // check if the popover is visible
        cy.get('div[id="select-places"').scrollTo('bottom');
        cy.get('p')
            .contains('Yucca Valley Oasis w/ Private Hot Tub! is located in Yucca Valley.')
            .should('be.visible');
        // check if the Select button is visible
        cy.get('button').contains('Select').should('be.visible').click();

        // check if the selected item is visible
        cy.get('h1').contains('Yuca Valley').click();

        // scroll to the bottom of the page
        cy.get('article').scrollTo('bottom');

        // check if the price per day is right and visibe
        // if the value is in dollar format, value is 1599

        cy.get('p[id="daily-price"]').contains('$200.00').should('be.visible');

        // select the range of dates for 4 days from tomorrow
        const tomorrowPlusSevenDays = new Date();
        tomorrowPlusSevenDays.setDate(tomorrowPlusSevenDays.getDate() + 7);
        // If the month is diffrent then need to press the next month button
        if (tomorrowPlusSevenDays.getMonth() !== tomorrow.getMonth())
            // get the next month button
            cy.get('button[aria-label="Go to next month"]').click();

        // select the first date
        cy.get('button[name="day"]:not(:disabled)')
            .contains(tomorrowPlusSevenDays.getDate())
            .last()
            .click();

        const tommrowPLusTenDays = new Date();
        tommrowPLusTenDays.setDate(tomorrow.getDate() + 10);
        // If the month is diffrent then need to press the next month button
        if (tommrowPLusTenDays.getMonth() !== tomorrow.getMonth())
            // get the next month button
            cy.get('button[aria-label="Go to next month"]').click();

        cy.get('button[name="day"]:not(:disabled)')
            .contains(tommrowPLusTenDays.getDate())
            .last()
            .click();

        cy.get('article').scrollTo('bottom');
        // check if the toast is visible

        // check if the button is visible
        cy.get('button').contains('Save').should('be.visible').click();

        // check if the modal is visible
        cy.get('p').contains('Attention: You have 24 ').should('be.visible');

        // check if the button is visible and click
        cy.get('button').contains('Continue').should('be.visible').click();

        // check if the toast is visible
        cy.get('div').contains('Booking created successfully').should('be.visible');

        // chick if was redirected to the current bookings tab title and date
        cy.get('h1').contains('Yuca Valley').should('be.visible');
        cy.get('p').contains(tomorrowPlusSevenDays.toLocaleDateString()).should('be.visible');

        // open the options and edit the second booking
        cy.get('button[name="options-booking"').should('be.visible').last().click();

        // check if the edit button is visible and click
        cy.get('button[name="edit"').should('be.visible').click();

        //open the date picker
        cy.get('button[id="date"]').should('be.visible').click();

        // select day before the first booking
        cy.get('button[name="day"]:not(:disabled)')
            .contains(tomorrow.getDate() - 1)
            .last()
            .click();

        //select day before the last date of the first booking
        cy.get('button[name="day"]:not(:disabled)')
            .contains(twoDaysFromTomorrow.getDate() + 1)
            .last()
            .click();

        // check if the toast is visible
        cy.get('div')
            .contains("You can't book in this period, please select another one.")
            .should('be.visible');
    });
});
