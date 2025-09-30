const createComplexQuiz = async (prompt: string, technologies: string[]): Promise<string> => {
	const quizId = await fetch('/api/quiz/complex', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ prompt, technologies })
	});

	const data = await quizId.json();
	return data.id;
};

export default createComplexQuiz;
