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


export const getCorsOptions = () => {
    const isLocal = process.env.ENV === 'local';
    console.log("-----")
    console.log(isLocal)
    if (isLocal) {
        return localCorsOptions;
    }

    return productionCorsOptions;
}

