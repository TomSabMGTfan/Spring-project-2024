import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { connectDB } from './db/postgresConnection.mjs';

import mainRouter from './routes/mainRouter.mjs';

const app = express();

// Server configuration
const startServer = async () => { 
	try {
		// Connecting to database
		const message = await connectDB();
		console.log(message);


		app.use(cors());

		// Configuring for json body requests
		app.use(express.json());

		// API routes
		app.use('/api', mainRouter);

		// Configuring port
		const port = process.env.PORT;

		// Starting server
		app.listen(port, () => {
			// Logging
			console.log(`Server is running and listening on port ${port}`);
		});

	} catch (error) {
		console.error('Failed to connect to database', error);

		process.exit(1);
	}
};

// Starting server
startServer();