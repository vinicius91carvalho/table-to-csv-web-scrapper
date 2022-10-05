const { defineConfig } = require("cypress")
const TableToJson = require('tabletojson').Tabletojson
const { Parser } = require('json2csv')
const fs = require('fs')
const path = require('path')
const { isFileExist } = require('cy-verify-downloads');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on("task", {
        async "transform:csv"({ tableHTMLContent }) {
          const json = TableToJson.convert('<table>' + tableHTMLContent + '</table>')[0]
          const parser = new Parser()
          return parser.parse(json)
        },
        async "save:file"({ fileName, content }) {
          const filePath = path.join('csv', `${fileName}.csv`)
          fs.writeFileSync(filePath, content)
          return null
        },
        isFileExist
      })
    },
    defaultCommandTimeout: 10000,
  },
});
