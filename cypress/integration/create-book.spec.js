const book_name = 'Dracula'
const book_author = 'Bram Stoker'

describe('When the user wants to create a book', () => {
    
    beforeEach('Enter in the page of books ui', () => {
        cy.visit('https://ui-books.herokuapp.com/dashboard')
    })

    it('Create the book and be listed with the right name and author', () => {
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.get('#name').type(book_name)
        cy.get('#author').type(book_author)
        cy.get('.ant-modal-footer > .ant-btn-primary').click()
        cy.contains('10 / page').click()
        cy.contains('50 / page').click()
        cy.get('table').contains('td', book_name).should('be.visible')
        cy.get('table').contains('tr', book_name).invoke('index').then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
    })

    it('When the user whats to create a book without name', () => {
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.get('#author').type(book_author)
        cy.get('.ant-modal-footer > .ant-btn-primary').should('be.disabled')
    })

    it('When the user whats to create a book without name', () => {
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.get('#name').type(book_name)
        cy.get('.ant-modal-footer > .ant-btn-primary').should('be.disabled')
    })

    it('When the user cancels the creation of a book', () => {
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.get('#name').type(book_name)
        cy.get('#author').type(book_author)
        cy.get('.ant-modal-footer > [nztype="default"]').click()
        cy.get('table').contains('td', book_name).should('not.exist')
        cy.get('table').contains('td', book_author).should('not.exist')
    })

})