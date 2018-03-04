require('dotenv').config({ silent: true })

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5100

app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
