import mongoose from 'mongoose';

import { connectDatabases } from './config/db';


import config from './config'
import app from './app';

async function main() {

    try {
        //await mongoose.connect(config.database_url as string);
        await connectDatabases(); 
        app.listen(config.port, () => {
            console.log(`Test app listening on port ${config.port}`);
        });
    } catch (err) {
        console.error("❌ Server startup error:", err);
        process.exit(1); // Exit process if database fails
    }

}
main();