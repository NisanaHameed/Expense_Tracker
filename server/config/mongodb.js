import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
        .then(() => console.log('database connected'))
        .catch(() => console.log('database not connected'))
}

export default connectDB;