const mongoose = require('mongoose')
const path = require('path')
const {Schema} = mongoose;

const imageSchema = new Schema({

title: {type:String},
filename:{type:String},
views:{type:Number,default:0},
likes:{type:Number,default:0},
description:{type:String},
timestamp:{type:Date,default:Date.now}

})
imageSchema.virtual('uniqueID').get(function() {
    const filename= this.filename.replace(path.extname(this.filename))

    return filename.slice(0,7)

})
module.exports = mongoose.model('image',imageSchema)