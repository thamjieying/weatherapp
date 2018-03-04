require('dotenv').config({ silent: true })

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()
const port = process.env.NODE_ENV === 'production' ? process.env.PORT : 5100

// request(url, (err, response, body)=>{
//   if(err){
//     console.log(err)
//   }else{
//     let weather = JSON.parse(body)
//     let message = `It's ${weather.forcast[region]} in ${region}`
//     console.log(message)
//   }
// })

app.use(express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/', (req, res)=>{
  let forcast = req.body.forcast
  let url = `http://api.nea.gov.sg/api/WebAPI/?dataset=${forcast}&keyref=${process.env.NEA_KEY}`

  request(url, (err, req, body)=>{
    if(err){
      res.render('index', {forcast: null, error:'Region not found, Please try again.'})
    }else{
      res.render('index', {forcast: body, error: null})
    }
  })
})


app.listen(port, () => {
  console.log(`Server is running on ${port}`)
})
