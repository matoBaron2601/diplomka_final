import { defineConfig } from 'drizzle-kit';
import type { Config } from 'drizzle-kit';
import './compression-polyfill.ts'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

export default defineConfig({
	out: './src/db',
	schema: './src/db/schema.ts',
	dialect: 'postgresql',
	dbCredentials: {
		url: process.env.DATABASE_URL!
	},
	strict: true,
	verbose: true
}) satisfies Config;
