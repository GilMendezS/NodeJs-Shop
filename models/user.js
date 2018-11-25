const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true
                },
                quantity: {
                    type: Number,
                    require: true
                }
            }
        ]
    }
})
module.exports = mongoose.model('User', UserSchema);