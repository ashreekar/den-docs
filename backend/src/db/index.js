import mongoose from 'mongoose';

const connectDataBase = async () => {
    try {
        const connectionInstance = await mongoose
            .connect(`mongodb://localhost:27017/dendocs`);

        console.log(`🗄️  Database connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("❌ Database connection failed:", err.message);
        process.exit(1);  // node functionality exits process with code 1
    }
}

export { connectDataBase };