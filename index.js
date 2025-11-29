import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { authentication } from './src/middleware/authentication.js';

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration: allow requests from allowed origins or localhost:3000 by default
const allowedOrigins = (process.env.CORS_ORIGINS || 'http://localhost:3000')
	.split(',')
	.map(s => s.trim())
	.filter(Boolean);

const corsOptions = {
	origin: (origin, callback) => {
		// allow requests with no origin (like mobile apps or curl)
		if (!origin) return callback(null, true);
		if (allowedOrigins.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error('CORS policy: Origin not allowed'));
		}
	},
	methods: ['GET','POST','PUT','DELETE','OPTIONS'],
	allowedHeaders: ['Content-Type','Authorization'],
	credentials: true,
};

app.use(cors(corsOptions));

// Body parser (built-in)
app.use(express.json());

// Simple request logger
app.use((req, res, next) => {
	console.log(`${new Date().toISOString()} -> ${req.method} ${req.originalUrl}`);
	next();
});

// Try to mount existing route modules if they export a router (using dynamic import)
const mountRoutes = async () => {
	try {
		const authRoutesModule = await import('./src/routes/auth.routes.js');
		const productRoutesModule = await import('./src/routes/product.routes.js');

		if (authRoutesModule && authRoutesModule.default) {
			app.use('/api/auth', authRoutesModule.default);
			console.log('Mounted /api/auth routes');
		}

		if (productRoutesModule && productRoutesModule.default) {
			// Proteger rutas de productos con autenticación JWT
			app.use('/api/products', authentication, productRoutesModule.default);
			console.log('Mounted /api/products routes (con autenticación)');
		}
	} catch (err) {
		console.log('No routes mounted (missing or empty route modules)', err.message);
	}
};

await mountRoutes();

// 404 handler for unknown routes
app.use((req, res) => {
	res.status(404).json({ message: 'Recurso no encontrado o ruta inválida' });
});

app.listen(PORT, () => {
	console.log(`Servidor Express corriendo en http://localhost:${PORT}`);
});


