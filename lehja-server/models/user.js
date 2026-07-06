const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
},
{ timestamps: true }
);

userSchema.pre("save", async function (){ // pre is a mongoose middleware that runs before the save event. save is a mongoose middleware event.
    this.password = await bcrypt.hash(this.password, 10);
});

module.exports = User = mongoose.model("User", userSchema);