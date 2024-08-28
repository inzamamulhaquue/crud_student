const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
        unique: true,
    },
    class:{
        type: String,
        require: true,
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;