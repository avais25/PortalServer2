const mongoose = require('mongoose')

const blogComments = new mongoose.Schema({
    comment_id: {type:Number , default:0, unique : true, required : true, dropDups: true },
    time : { type : Date, default: Date.now },
    content: {type:String , trim:true , default:''},
    post_id: {type:Number , default:0 },
    RollNo: {type:Number , default:0 },
})

module.exports = mongoose.model('blogComments',blogComments)