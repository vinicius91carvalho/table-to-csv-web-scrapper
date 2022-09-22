describe('Yahoo Finance', () => {
  it('should download main table as a CSV', () => {
    cy.on('uncaught:exception', (err, runnable) => {
      return false
    })

    cy.visit('https://finance.yahoo.com/quote/6L%3DF/history?p=6L%3DF')

    cy.get('table[data-test="historical-prices"]').each(($el, index, $list) => {
      const table = $el.html()
      cy.task('transform:csv', {
        tableHTMLContent: table
      }).then((csv) => {
        cy.task('save:file', {
          fileName: 'yahoo-finance-brazilian-real-futures-quotes',
          content: csv
        })
      })
    })
  })
})