const express = require('express')
const app = express()
const port = 8080
const wwwroot = '1047'

app.use(express.static('wwwroot'))
app.use(express.static('lib'))

app.listen(port, () => console.log(`listening on http://localhost:${port}`))