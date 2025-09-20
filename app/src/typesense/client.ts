import Typesense from 'typesense';
import dotenv from 'dotenv';

dotenv.config();

const typesenseClient = new Typesense.Client({
	nodes: [
		{
			host: 'localhost',
			port: 8108,
			protocol: 'http'
		}
	],
	apiKey: process.env.TYPESENSE_API_KEY!
});

export default typesenseClient;
