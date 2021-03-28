const book_name = 'Dracula'
const book_author = 'Bram Stoker'
const new_book_name = 'Drácula'

describe('When the user wants to delete a book', () => {

    before('Enter in the page', () => {
        cy.visit('https://ui-books.herokuapp.com/dashboard')
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.wait(1000)
        cy.get('#name').type(book_name)
        cy.get('#author').type(book_author)
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click()
        cy.contains('10 / page').click()
        cy.contains('50 / page').click()
    })

    after('Delete the book created', () => {
        cy.get('table').contains('tr', new_book_name).invoke('index').then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    })

    it('The name of the book should not change before edit', () => {
        cy.get('table').contains('td', book_name).should('be.visible')
    })

    it('The name of the book should change', () => {
        cy.get('table').contains('tr', book_name).invoke('index').then((i) =>{
            cy.get(`:nth-child(${i+1}) > :nth-child(4) > .ant-btn`).click();
        })
        cy.get('#name').clear().type('Drácula')
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click()
        cy.get('table').contains('td', 'Drácula').should('be.visible')
    })

})