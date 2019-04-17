const mongoose = require('mongoose')


const studentsubjects = new mongoose.Schema({
    RollNo: {type:Number , default:0},
    Topic: {type:String , trim:true , default:''},
    Semester: {type:String , trim:true , default:''},
    raisedhands:  {type:Number , default:0},
    VisITedResources:  {type:Number , default:0},
    AnnouncementsView: {type:Number , default:0},
    Discussion:  {type:Number , default:0},
    StudentAbsenceDays:  {type:Number , default:0},
    GradeID: {type:String , trim:true , default:''},
    Year: {type:Number , default:0}
})



module.exports = mongoose.model('studentsubjects',studentsubjects)