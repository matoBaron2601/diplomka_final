import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { option, type NewOption, type Option } from '../db/schema';

export class OptionRepository {
	async getOptionById(optionId: string): Promise<Option> {
		const result = await db.select().from(option).where(eq(option.id, optionId));
		return result[0];
	}

	async createOption(newOption: NewOption): Promise<Option> {
		const result = await db.insert(option).values(newOption).returning();
		return result[0];
	}

	async deleteOptionById(optionId: string): Promise<Option> {
		const result = await db.delete(option).where(eq(option.id, optionId)).returning();
		return result[0];
	}

	async updateOption(newOption: Option): Promise<Option> {
		const result = await db
			.update(option)
			.set(newOption)
			.where(eq(option.id, newOption.id))
			.returning();
		return result[0];
	}
}
