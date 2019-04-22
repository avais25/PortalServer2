const mongoose = require('mongoose')

const Students = new mongoose.Schema({
    RollNo: {type:Number , default:0, unique : true, required : true, dropDups: true },
    firstName: {type:String , trim:true , default:'' , required : true},
    lastName: {type:String , trim:true , default:'' , required : true},
    age: {type:Number , default:0},
    city: {type:String , trim:true , default:''},
    pin: {type:Number , default:0},
    tenGrade: {type:Number , default:0},
    twelveGrade:  {type:Number , default:0},
    btecheGrade:  {type:Number , default:0},
    gateScore:  {type:Number , default:0},
    cpi:  {type:Number , default:0},
    gender:  {type:String , default:'NA'},
    workExp:  {type:Number , default:0},
})

module.exports = mongoose.model('Students',Students)