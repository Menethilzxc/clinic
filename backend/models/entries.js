import mongoose from 'mongoose';

export const EntriesSchema = new mongoose.Schema({
	date: { type: String, required: true },
	name: { type: String, required: true },
	phone: { type: String, required: true },
	problem: { type: String, required: true },
});
