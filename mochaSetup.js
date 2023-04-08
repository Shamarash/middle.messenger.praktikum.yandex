const { JSDOM } = require('jsdom')
const Handlebars = require('handlebars')
const fs = require('fs')

const { window } = new JSDOM('<main class="App"></main>', {
  url: 'http://localhost:3000'
})

global.window = window
global.document = window.document
global.DocumentFragment = window.DocumentFragment
global.Node = window.Node

// eslint-disable-next-line n/no-deprecated-api
require.extensions['.hbs'] = function (module, filename) {
  const contents = fs.readFileSync(filename, 'utf-8')

  module.exports = Handlebars.compile(contents)
}
require.extensions['.pcss'] = function () {
  module.exports = () => ({})
}