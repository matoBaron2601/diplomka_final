import { db } from '../db/client';
import { eq } from 'drizzle-orm';
import { option, type NewOptionDto, type OptionDto } from '../db/schema';
import { type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { type ExtractTablesWithRelations } from 'drizzle-orm/relations';
import { type PgTransaction } from 'drizzle-orm/pg-core';

export class OptionRepository {
	async getOptionById(optionId: string): Promise<OptionDto | undefined> {
		const result = await db.select().from(option).where(eq(option.id, optionId));
		return result[0];
	}

	async createOption(
		newOption: NewOptionDto,
		tx: PgTransaction<
			NodePgQueryResultHKT,
			Record<string, never>,
			ExtractTablesWithRelations<Record<string, never>>
		>
	): Promise<OptionDto> {
		const result = await tx.insert(option).values(newOption).returning();
		return result[0];
	}

	async deleteOptionById(optionId: string): Promise<OptionDto | undefined> {
		const result = await db.delete(option).where(eq(option.id, optionId)).returning();
		return result[0];
	}

	async updateOption(newOption: OptionDto): Promise<OptionDto | undefined> {
		const result = await db
			.update(option)
			.set(newOption)
			.where(eq(option.id, newOption.id))
			.returning();
		return result[0];
	}
}
