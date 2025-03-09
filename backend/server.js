import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import chalk from 'chalk';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { OwnersSchema } from './models/owners.js';
import { EntriesSchema } from './models/entries.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => console.log(chalk.bgBlue('Connected to MongoDB')))
	.catch((error) => console.error(chalk.bgRed('MongoDB connection error: '), error));

const Owners = mongoose.model('Owners', OwnersSchema, 'accounts');
const Entries = mongoose.model('Entries', EntriesSchema, 'entries');

app.get('/accounts', async (req, res) => {
	try {
		const accounts = await Owners.find();

		res.json(accounts);
	} catch (error) {
		console.log('Ошибка запроса аккаунтов: ', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

app.get('/entries', async (req, res) => {
	try {
		const entries = await Entries.find();

		res.status(200).send(entries);
	} catch (error) {
		console.log('Ошибка запроса записей: ', error);
		res.status(500).send('Error fetching entries: ', error.message);
	}
});

const hashedPassword = await bcrypt.hash('pass', 10);
await Owners.create({ email: 'user@mail.com', password: hashedPassword });

app.post('/login', async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await Owners.findOne({ email });

		if (!user) {
			return res.status(401).json({ message: 'Неверный email или пароль' });
		}

		const isPasswordValid = await bcrypt.compare(password, user.password);

		if (!isPasswordValid) {
			return res.status(401).json({ message: 'неверный email или пароль' });
		}

		const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
			expiresIn: '1h',
		});

		res.json({ token });
	} catch (error) {
		console.error('Ошибка авторизации: ', error);
		res.status(500).json({ message: 'Ошибка сервера' });
	}
});

app.post('/entries', async (req, res) => {
	try {
		const { date, name, phone, problem } = req.body;

		const newEntry = new Entries({
			date,
			name,
			phone,
			problem,
		});

		await newEntry.save();

		res.status(201).json({ message: 'Запись успешно добавлена' });
	} catch (error) {
		console.error('Ошибка запроса: ', error);
		res.status(500).json({ message: 'Ошибка запроса' });
	}
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(chalk.bgGreen('Server started on port 5000')));
