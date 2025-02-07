import { connectMongoDB } from "./mongo.db";
//import { connectPostgres } from "./postgres.db";

export const connectDatabases = async () => {
    await connectMongoDB();
   // await connectPostgres();
};