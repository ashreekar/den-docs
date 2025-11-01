import mongoose from 'mongoose';

const connectDataBase = async (url) => {
    try {
        const connectionInstance = await mongoose
            .connect(`${url}/dendocs`);

        console.log(`🗄️  Database connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("❌ Database connection failed:", err.message);
        process.exit(1);  // node functionality exits process with code 1
    }
}

export { connectDataBase };