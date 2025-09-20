import Elysia from 'elysia';
import { getUniqueDatasetsService } from '../../../typesense/typesenseService';
import type { UniqueDataset } from '../../../typesense/types';
export const typesenseApi = new Elysia()
	//General
	.get('typesense/collection', async () => {
		return {};
	})
	.post('typesense/collection', async () => {
		return {};
	})

	.delete('typesense/collection', async () => {
		return {};
	})
	// Default
	.post('typesense/collection/default/populate', async () => {
		return {};
	})
	.get('typesense/default/dataset', async () : Promise<UniqueDataset[]> => {
		console.log("Fetching default datasets");
		return getUniqueDatasetsService({ isDefault: true });
	})
	// Custom
	.get('typesense/collection/custom/populate', async () => {
		return {};
	})
	.get('typesense/custom/dataset', async () => {
		return {};
	});
