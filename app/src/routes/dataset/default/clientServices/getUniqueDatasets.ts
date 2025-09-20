import type { UniqueDataset } from '../../../../typesense/types';

export const getUniqueDatasets = async (): Promise<UniqueDataset[]> => {
	const response = await fetch('/api/typesense/default/dataset', {
		method: 'GET'
	});
	if (!response.ok) {
		throw new Error('Failed to fetch unique datasets');
	}
	return response.json();
};
