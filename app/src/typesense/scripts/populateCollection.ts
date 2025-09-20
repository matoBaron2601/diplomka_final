import { populateDocumentsService } from '../typesenseService';
import react_documents from './data/react_document.json';

const run = async () => {
	try {
		const result = await populateDocumentsService({
			contentChunks: react_documents.content,
			is_default: true,
			technology: ['react'],
			source_file: 'react_document.json'
		});
		console.log('Collection populated successfully:', result);
	} catch (error) {
		console.error('Error populating collection:', error);
	}
};

run();
