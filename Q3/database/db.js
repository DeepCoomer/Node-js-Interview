import mongoose from 'mongoose';

const Connection = async (MONGO_URL) => {
    try {
        const connectionParams = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        };
        await mongoose.connect(MONGO_URL, connectionParams);
        console.log("connected to database.");
    } catch (error) {
        console.log(error, "could not connect database.");
    }
}

export default Connection;