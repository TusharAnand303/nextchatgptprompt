import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    email: {
        type: String,
        unique: [true, 'Email already exists!'],
        required: [true, 'Email is required!'],
        index: true,
    },
    username: {
        type: String,
        required: true,
    },
    image: {  
        type: String,
    }
});

const User = models.User || model("User", UserSchema);  // Model name should match your schema

export default User;