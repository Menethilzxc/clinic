import mongoose from 'mongoose';

export const OwnersSchema = new mongoose.Schema({
	login: String,
	password: String,
});
