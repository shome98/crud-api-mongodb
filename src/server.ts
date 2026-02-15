import dotenv from 'dotenv';
import connectDB from './config/db';
import app from './app';

dotenv.config();

const PORT = process.env.PORT || 5000;

// const startServer = async () => {
//     try {
//         // Connect to Database first
//         await connectDB();

//         app.listen(PORT, () => {
//             console.log(`Server is running on port ${PORT} 🔥`);
//         });
//     } catch (error) {
//         console.log('Failed to connect to the database. Server not started. ❌');
//         process.exit(1);
//     }
// };

// startServer();

// Connect to Database
connectDB().then(() =>
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} 🔥`);
    })).catch((error) => console.log(`Error: ${error.message} ❌`));


