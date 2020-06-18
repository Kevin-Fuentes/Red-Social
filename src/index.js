const express = require('express')
const config = require('./server/config')

const app = config(express())

require('./database')

 const port = process.env.PORT || 4000
app.listen(port,'0.0.0.0',()=>{
     console.log('Conectado en el puerto:',port)
})
