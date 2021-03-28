const book_name = 'Dracula'
const book_author = 'Bram Stoker'

describe('When the user wants to delete a book', () => {

    before('Enter in the page', () => {
        cy.visit('https://ui-books.herokuapp.com/dashboard')
        cy.get('.ant-btn-primary > .ng-star-inserted').click()
        cy.get('#name').type(book_name)
        cy.get('#author').type(book_author)
        cy.get('.ant-modal-footer > .ant-btn-primary > .ng-star-inserted').click()
        cy.contains('10 / page').click()
        cy.contains('50 / page').click()
    })

    it('The book should exists', () => {
        cy.get('table').contains('td', book_name).should('exist')
    })

    it('The book should not exists', () => {
        cy.get('table').contains('tr', book_name).invoke('index').then((i) =>{
            cy.get(`:nth-child(${i+1}) > .ant-table-selection-column > .ant-checkbox-wrapper > .ant-checkbox > .ant-checkbox-input`).click();
        })
        cy.get('[nztype="default"]').click();
        cy.get('table').contains('td', book_name).should('not.exist')
    })

})