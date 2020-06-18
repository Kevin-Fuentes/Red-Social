const mongoose = require('mongoose')
const {database} = require('./keys')


mongoose.connect(database.URI,{useCreateIndex:true,
     useNewUrlParser: true,
     useUnifiedTopology: true,

}).then(db=>console.log('Conectado'))
.catch(err =>{
     console.error('err :', err);
})