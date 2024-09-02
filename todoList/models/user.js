import mongoose, { Error } from 'mongoose';

const Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/todos');

const userSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    facebookId: {
        type: String,
    },
});

userSchema.static.findOrCreate = async function(service,userData) {
    if(service === 'facebook') {
        try {
            const user = await this.findOne({facebookId: userData.facebookId});
            if(user) {
                return user;
            } else {
                const user = await new User(userData);
                await user.save();
                return user;
            }
        } catch(error) {
            throw new Error(error);
        }
    }
};

const User = mongoose.model('User', userSchema);

export default User;