import express from "express";
import cors from 'cors';

export const setupConfig = (app) =>{
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors(getCorsOptions()));
};

function getCorsOptions() {
    const isLocal = process.env.ENV === 'local';

    if (isLocal) {
        const localCorsOptions = {
          origin: (origin, callback) => {
            if (!origin || origin.startsWith('http://localhost:')) {
              callback(null, true);
            } else {
              callback(new Error('Not allowed by CORS'));
            }
          },
          credentials: true
        };
        return localCorsOptions;
    }

    //PROD
    const productionCorsOptions = {
        origin: (origin, callback) => {
            const allowedOrigins = [
                'https://tu-sitio-web-en-produccion.com',//TODO
                'https://www.tu-sitio-web-en-produccion.com'//TODO
            ];

            if (!origin || allowedOrigins.includes(origin)) {
                return callback(null, true);
            }
            return callback(new Error('Bloqueado por CORS (Producción)'));
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization']
    };
    return productionCorsOptions;
}