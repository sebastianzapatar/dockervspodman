import cron from 'node-cron';

let count = 0;

console.log('Iniciando cronjob (cada 10 segundos)...');

// Se ejecuta en los segundos 0, 10, 20, 30, 40, 50 de cada minuto
cron.schedule('*/10 * * * * *', () => {
    count++;
    console.log(`[${new Date().toISOString()}] Ejecución número: ${count}`);
});
