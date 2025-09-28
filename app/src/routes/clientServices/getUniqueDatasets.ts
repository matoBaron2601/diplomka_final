import type { UniqueDataset } from '../../typesense/types';
import type { Dataset } from '../types';

export const getUniqueDatasets = async (datasetType : Dataset): Promise<UniqueDataset[]> => {
	const response = await fetch(`/api/typesense/${datasetType}/dataset`, {
		method: 'GET'
	});
	if (!response.ok) {
		throw new Error('Failed to fetch unique datasets');
	}
	return response.json();
};
