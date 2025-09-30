import { db } from '../client';
import { option, question, quiz, user, userAnswer, userQuiz } from '../schema';

async function populateDatabase() {
	try {
		//USER
		await db.insert(user).values([
			{
				id: 'user1',
				email: 'user1@example.com',
				name: 'User One',
				profilePicture: 'http://example.com/user1.png'
			},
			// {
			// 	id: 'user2',
			// 	email: 'user2@example.com',
			// 	name: 'User Two',
			// 	profilePicture: 'http://example.com/user2.png'
			// }
		]);

		// //QUIZ
		// await db.insert(quiz).values([
		// 	{
		// 		id: 'quiz1',
		// 		creatorId: 'user1',
		// 		timePerQuestion: 30,
		// 		canGoBack: true
		// 	}
		// ]);

		// //QUESTION
		// await db.insert(question).values([
		// 	{
		// 		id: 'question1',
		// 		quizId: 'quiz1',
		// 		text: 'What is the capital of France?'
		// 	},
		// 	{
		// 		id: 'question2',
		// 		quizId: 'quiz1',
		// 		text: 'What is 2 + 2?'
		// 	}
		// ]);

		// //OPTION
		// await db.insert(option).values([
		// 	{
		// 		id: 'option1',
		// 		questionId: 'question1',
		// 		text: 'Paris',
		// 		isCorrect: true
		// 	},
		// 	{
		// 		id: 'option2',
		// 		questionId: 'question1',
		// 		text: 'London',
		// 		isCorrect: false
		// 	},
		// 	{
		// 		id: 'option3',
		// 		questionId: 'question2',
		// 		text: '3',
		// 		isCorrect: false
		// 	},
		// 	{
		// 		id: 'option4',
		// 		questionId: 'question2',
		// 		text: '4',
		// 		isCorrect: true
		// 	}
		// ]);

		// //USERQUIZ
		// await db.insert(userQuiz).values([
		// 	{
		// 		id: 'userQuiz1',
		// 		userId: 'user2',
		// 		quizId: 'quiz1'
		// 	}
		// ]);

		// // USERANSWER
		// await db.insert(userAnswer).values([
		// 	{
		// 		id: 'userAnswer1',
		// 		userId: 'user1',
		// 		questionId: 'question1',
		// 		optionId: 'option1'
		// 	},
		// 	{
		// 		id: 'userAnswer2',
		// 		userId: 'user1',
		// 		questionId: 'question2',
		// 		optionId: 'option4'
		// 	}
		// ]);

		console.log('Database populated successfully!');
	} catch (error) {
		console.error('Error populating database:', error);
	} finally {
		await db.$client.end();
	}
}

populateDatabase();
