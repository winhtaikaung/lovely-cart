const express = require('express')
const path = require('path')
const port = process.env.PORT || 3000
const API_URL = process.env.API_URL || 'http://localhost:3002/'
const app = express()
app.use(express.static(__dirname + '/build'))

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.get('*', function(request, response) {
  response.render(path.resolve(__dirname, 'build', 'index.ejs'), {
    REACT_APP_API_URL: API_URL,
  })
})

const server = app.listen(port, function(error) {
  if (error) {
    console.log(error)
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port)
  }
})

process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated')
  })
})
process.on('SIGINT', () => {
  server.close(() => {
    console.log('Server terminated')
  })
})
