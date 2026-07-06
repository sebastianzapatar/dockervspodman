import express from 'express';
import { connectDB } from './config/db';
import itemRoutes from './routes/item.routes';

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 3000;

app.use('/items', itemRoutes);

async function main() {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log(`API corriendo en http://localhost:${PORT}`);
            console.log('Endpoints disponibles:');
            console.log('  POST   /items       → Insertar');
            console.log('  GET    /items       → Buscar todos');
            console.log('  GET    /items/:id   → Buscar por ID');
            console.log('  PUT    /items/:id   → Editar');
            console.log('  DELETE /items/:id   → Borrar');
        });
    } catch (err) {
        console.error('No se pudo conectar a MongoDB o arrancar el servidor:', err);
        process.exit(1);
    }
}

main();
