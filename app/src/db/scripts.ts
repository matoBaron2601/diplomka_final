import { db } from './client';

async function deleteDatabaseTables() {
	try {
		console.log('Dropping userAnswer table...');
		await db.execute('DROP TABLE IF EXISTS "userAnswer" CASCADE;');

		console.log('Dropping option table...');
		await db.execute('DROP TABLE IF EXISTS "option" CASCADE;');

		console.log('Dropping question table...');
		await db.execute('DROP TABLE IF EXISTS "question" CASCADE;');

		console.log('Dropping userQuiz table...');
		await db.execute('DROP TABLE IF EXISTS "userQuiz" CASCADE;');

		console.log('Dropping quiz table...');
		await db.execute('DROP TABLE IF EXISTS "quiz" CASCADE;');

		console.log('Dropping user table...');
		await db.execute('DROP TABLE IF EXISTS "user" CASCADE;');

		console.log('All tables dropped successfully!');
	} catch (error) {
		console.error('Error dropping tables:', error);
	}
}

deleteDatabaseTables();
