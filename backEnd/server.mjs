import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

import { connectDB } from './db/postgresConnection.mjs';

import passport from './strategies/auth.mjs';

import usersRouter from './routes/index.mjs';

const app = express();

const startServer = async () => { // async nes nenoriu iskart paleisti script, naudoju await connection su duomenu baze
	try {
		const message = await connectDB(); // laukiame kol susijungs su duomenu baze todel naudoju await = await connection to database
		console.log(message);


		app.use(cors());
		app.use(express.json());

		app.use(passport.initialize());

		app.use('/api/v1/library', usersRouter);

		const port = process.env.PORT;

		app.listen(port, () => {
			console.log(`Server is running and listening on port ${port}`);
		});

	} catch (error) {
		console.error('Failed to connect to database', error);

		process.exit(1);
	}
};

startServer();