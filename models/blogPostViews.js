const mongoose = require('mongoose')

const blogPostViews = new mongoose.Schema({
    pvid: {type:Number , default:0, unique : true, required : true, dropDups: true },
    RollNo: {type:Number , default:0 },
    post_id: {type:Number , default:0 }
})

module.exports = mongoose.model('blogPostViews',blogPostViews)