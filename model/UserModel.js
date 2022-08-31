import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLenght: [30, "Name Cannot exceed 30 Character"],
        minLenght: [5, "Name Should have Atleast 5 character"]

    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLenght: [8, "Password Should have Atleast 8 character"],
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})



const User = mongoose.model("User", UserSchema)
export default User