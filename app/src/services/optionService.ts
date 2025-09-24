import type { Option, NewOption } from '../db/schema';
import type { OptionRepository } from '../repositories/optionRepository';

export class OptionService {
	constructor(private optionRepository: OptionRepository) {}

	async getOptionById(optionId: string): Promise<Option> {
		return this.optionRepository.getOptionById(optionId);
	}

	async createOption(newOption: NewOption): Promise<Option> {
		return this.optionRepository.createOption(newOption);
	}

	async deleteOptionById(optionId: string): Promise<Option> {
		return this.optionRepository.deleteOptionById(optionId);
	}

	async updateOption(newOption: Option): Promise<Option> {
		return this.optionRepository.updateOption(newOption);
	}
}
