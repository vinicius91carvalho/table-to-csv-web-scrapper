describe('CME Group', () => {
  it('should download main table as a CSV', () => {
    const headers = {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.6',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'DNT': '1',
      'Host': 'www.cmegroup.com',
      'Pragma': 'no-cache',
      'Sec-Fetch-Dest': 'document',
      'Sec-Fetch-Mode': 'navigate',
      'Sec-Fetch-Site': 'same-origin',
      'Sec-Fetch-User': '?1',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36',
      'sec-ch-ua': '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
    }
    cy.visit('https://www.cmegroup.com/markets/fx/emerging-market/brazilian-real.quotes.html', {
      headers
    })

    cy.get('.load-all').click()

    cy.get('table').each(($el, index, $list) => {
      const table = $el.html()
      cy.task('transform:csv', {
        tableHTMLContent: table
      }).then((csv) => {
        cy.task('save:file', {
          fileName: 'cmegroup-brazilian-real-futures-quotes',
          content: csv
        })
      })
    })
  })
})