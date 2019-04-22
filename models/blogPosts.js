const mongoose = require('mongoose')

const blogPosts = new mongoose.Schema({
    post_id: {type:Number , default:0, unique : true, required : true, dropDups: true },
    time : { type : Date, default: Date.now },
    title: {type:String , trim:true , default:''},
    overview: {type:String ,  default:''},
    content: {type:String ,  default:''},
    featured: {type:Number , default:0 },
    RollNo: {type:Number , default:0 },
    thumbnail: {type:String , trim:true , default:''},
    next_post_id: {type:Number , default:0 },
    prev_post_id: {type:Number , default:0 }
})

module.exports = mongoose.model('blogPosts',blogPosts)