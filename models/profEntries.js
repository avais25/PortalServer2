const mongoose = require('mongoose')

const profEntries = new mongoose.Schema({
    id: {type:Number , default:0, unique : true, required : true, dropDups: true },
    fid: {type:Number , default:0 },
    title: {type:String , trim:true , default:''},
    description: {type:String , trim:true , default:''},
    grades: {type:Number , default:0 },
    count: {type:Number , default:0 },
    courses: [String],

})

module.exports = mongoose.model('profEntries',profEntries)