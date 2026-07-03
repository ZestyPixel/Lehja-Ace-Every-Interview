const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
});

userSchema.pre("save", async function (){ // pre is a mongoose middleware that runs before the save event. save is a mongoose middleware event.
    this.password = await bcrypt.hash(this.password, 10);
});