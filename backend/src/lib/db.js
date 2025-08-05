import mongoose from 'mongoose'

export const connectDB = async () => {
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDb ${connection.host}`)
    } catch (error) {
        console.error('Error while conneting DB: ', error);
        process.exit(1);
    }
}