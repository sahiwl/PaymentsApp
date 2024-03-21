const mongoose = require('mongoose');
mongoose.connect('');
 
const paytmSchema = new mongoose.Schema({
    username:{ 
        required: true,
        type: String,
        minLength: 3,
        maxLength: 30,
        trim: true,
        unique: true,
        lowercase: true
    },
    password:{
        required: true,
        type: String,
        minLength:6
    },
    firstName: {
        required: true,
        type: String,
        maxLength: 30,
        trim: true
    },
    lastName:{
        required: true,
        type: String,
        maxLength: 30,
        trim: true
    }
});

const Human = new mongoose.model("Human", paytmSchema);
module.exports = {
    Human
};