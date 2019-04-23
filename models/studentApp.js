const mongoose = require('mongoose')

const studentApp = new mongoose.Schema({
    id: {type:Number , default:0, unique : true, required : true, dropDups: true },
    RollNo: {type:Number , default:0 },
    Preference : [Number]
})

module.exports = mongoose.model('studentApp',studentApp)