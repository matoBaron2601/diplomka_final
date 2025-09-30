import axios from 'axios';
import { config } from 'dotenv';

config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

interface ChoiceMessage {
	role: 'user' | 'assistant'; // role can be 'user' or 'assistant'
	content: string; // the generated message content
}

interface Choice {
	index: number; // index of the choice
	message: ChoiceMessage; // message content
	finish_reason: string; // reason for finishing the response
}

interface Usage {
	prompt_tokens: number; // number of tokens in the prompt
	completion_tokens: number; // number of tokens in the completion
	total_tokens: number; // total number of tokens used
}

export interface OpenAIChatCompletionResponse {
	id: string; // unique identifier for the completion request
	object: 'chat.completion'; // type of the object returned
	created: number; // timestamp of creation in Unix time
	model: string; // model used (e.g., 'gpt-4.0-turbo')
	choices: Choice[]; // array of choices returned
	usage: Usage; // token usage statistics
}

const prompt = `Please return a JSON response that strictly conforms to the following schema with the creatorId set to "user1". Return only the JSON object, nothing else:

{
    "quiz": {
        "creatorId": "user1",
        "timePerQuestion": null, // Optional - can be a number
        "canGoBack": null // Optional - can be a boolean
    },
    "questions": [
        {
            "text": "", // Example: "What is the capital of France?"
            "options": [
                {
                    "text": "", // Example: "Paris"
                    "isCorrect": false // Example: true or false
                }
            ]
        }
    ]
}`;

export class OpenAiService {
	async callOpenAI(): Promise<OpenAIChatCompletionResponse> {
		const response = await axios.post(
			'https://api.openai.com/v1/chat/completions',
			{
				model: 'gpt-4o-mini',
				messages: [{ role: 'user', content: prompt }]
			},
			{
				headers: {
					Authorization: `Bearer ${OPENAI_API_KEY}`,
					'Content-Type': 'application/json'
				}
			}
		);

		return response.data;
	}
}
