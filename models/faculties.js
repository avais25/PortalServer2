const mongoose = require('mongoose')

const Faculties = new mongoose.Schema({
    fid: {type:Number , default:0, unique : true, required : true, dropDups: true },
    firstName: {type:String , trim:true , default:''},
    lastName: {type:String , trim:true , default:''},
    age: {type:Number , default:0},
    noOfPub: {type:Number , default:0},
    noOfPhd: {type:Number , default:0},
    noOfMtech: {type:Number , default:0},
    noOfBtech: {type:Number , default:0},
    areaOfWOrk: [String]
})

module.exports = mongoose.model('Faculties',Faculties)