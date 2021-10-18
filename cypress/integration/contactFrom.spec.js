/// <reference types="cypress" />

describe('This validates the contact form', () => {
    before(() => {
        cy.visit('http://automationpractice.com/index.php?controller=contact')
    })

    it('This validate the fields existance and behavior of the fields in the contact form', () => {
        cy.get('[class="page-subheading"]')
            .should('be.visible')
            .should('have.text', 'send a message')

        cy.get('select').select('Customer service').should('have.value', '2')
        cy.get('[id="desc_contact2"]')
            .should('have.text', "\n                            For any question about a product, an order\n                        ")

        cy.get('select').select('Webmaster').should('have.value', '1')
            .should('have.text', '\n                        -- Choose --\n                                                    Customer service\n                                                    Webmaster\n                                            ')

        cy.get('[class="form-group"] label').first()
            .should('have.text', 'Email address')

        cy.get('[data-validate="isEmail"]')
            .should('be.visible')
            .type('testuser@')

        cy.clickOnSubmit()

        cy.findErrorMessage()
            .should('have.text', 'There is 1 error')

        cy.get('[class="alert alert-danger"] ol li')
            .should('be.visible')
            .should('have.text', 'Invalid email address.')

        cy.get('[data-validate="isEmail"]')
            .type('{selectall}')
            .should('be.visible')
            .type('testuser@gmail.com')

        cy.clickOnSubmit()

        cy.findErrorMessage()
            .should('have.text', 'There is 1 error')

        cy.get('[class="alert alert-danger"] ol li')
            .should('be.visible')
            .should('have.text', 'The message cannot be blank.')

        cy.get('[class="form-group"] label').last()
            .should('be.visible')
            .should('have.text', 'Message')

        cy.get('[id="message"]')
            .type('This is Exercise 2 from the QA Challenge')

        const filepath = 'JobSityImage.png'
        cy.get('[id="fileUpload"]').attachFile(filepath)

        cy.clickOnSubmit()

        cy.get('[class="alert alert-success"]')
            .should('have.text', 'Your message has been successfully sent to our team.')
            .should('have.css', 'background-color', 'rgb(85, 198, 94)')
    })
})