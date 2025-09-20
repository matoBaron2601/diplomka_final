import { deleteCollectionService } from '../typesenseService';

const run = async () => {
	try {
		const result = await deleteCollectionService();
		console.log('Collection deleted successfully:', result);
	} catch (error) {
		console.error('Error deleting collection:', error);
	}
};

run();
