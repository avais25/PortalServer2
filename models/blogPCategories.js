const mongoose = require('mongoose')

const blogPCategories = new mongoose.Schema({
    pcid: {type:Number , default:0, unique : true, required : true, dropDups: true },
    cid: {type:Number , default:0 },
    post_id: {type:Number , default:0 }
})

module.exports = mongoose.model('blogPCategories',blogPCategories)