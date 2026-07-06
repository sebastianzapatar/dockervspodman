import { MongoClient, Db } from 'mongodb';

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'crud_db';

let dbInstance: Db;

export async function connectDB(): Promise<void> {
    console.log(`Conectando a MongoDB en ${MONGO_URL}...`);
    const client = await MongoClient.connect(MONGO_URL);
    dbInstance = client.db(DB_NAME);
    console.log(`Conectado a la base de datos "${DB_NAME}"`);
}

export function getDB(): Db {
    if (!dbInstance) {
        throw new Error('La base de datos no está inicializada. Llama a connectDB primero.');
    }
    return dbInstance;
}
