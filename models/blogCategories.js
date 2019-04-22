const mongoose = require('mongoose')

const blogCategories = new mongoose.Schema({
    cid: {type:Number , default:0, unique : true, required : true, dropDups: true },
    category: {type:String , trim:true , default:''},
})

module.exports = mongoose.model('blogCategories',blogCategories)