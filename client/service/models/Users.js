import mongoose from 'mongoose'

// Creating a schema
const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required']
    },
    lastName: {
        type: String, 
        required: [true, 'Last name is required']
    },
    userName: {
        type: String,
        required: [true, 'Username is required']
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    emailAddress: {
        type: String,
        required: [true, 'Email address is required']
    },
    decks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Deck'
    }]
})
export const Users = mongoose.model('Users', UserSchema);