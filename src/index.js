const express = require('express')
const config = require('./server/config')

const app = config(express())

require('./database')


app.listen(app.get('port'),'0.0.0.0',()=>{
console.log('Server on port:',app.get('port'));

})