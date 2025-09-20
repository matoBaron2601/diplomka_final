import { createCollectionService } from '../typesenseService';

const run = async () => {
	try {
		const result = await createCollectionService();
		console.log('Collection created successfully:', result);
	} catch (error) {
		console.error('Error creating collection:', error);
	}
};

run();
