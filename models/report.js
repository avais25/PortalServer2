const mongoose = require('mongoose')

const Reports = new mongoose.Schema({
    rid: {type:Number , default:0, unique : true, required : true, dropDups: true },
    RollNo:  {type:Number , default:0},
    time : { type : Date, default: Date.now },
    sTime: { type : Date, default: Date.now },
    marks: {type:Number , default:0},
    comment: {type:String , trim:true , default:''},
    //report: {type: Buffer , default: ''}
})

module.exports = mongoose.model('Reports',Reports)