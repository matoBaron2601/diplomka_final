import { chunkRTC } from './chunkerRepository';

export const chunkRTCService = async (file: File): Promise<string[]> => {
	const formData = new FormData();
	formData.append('file', file);
	const response = await chunkRTC(formData);
	const data = await response.json();
	return JSON.parse(JSON.stringify(data, null, 2));
};
