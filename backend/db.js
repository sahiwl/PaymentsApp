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

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
})

const Account = new mongoose.model('Account', accountSchema)

















const User = new mongoose.model("User", paytmSchema);
module.exports = {
    User,
    Account
};