const mongoose = require('mongoose')

const teacherMeets = new mongoose.Schema({
    RollNo:  {type:Number , default:0},
    time : { type : Date, default: Date.now },
    futureWork: {type:String , trim:true , default:''}
})

module.exports = mongoose.model('teacherMeets',teacherMeets)