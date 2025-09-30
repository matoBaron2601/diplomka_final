import { type NodePgQueryResultHKT } from 'drizzle-orm/node-postgres';
import { type ExtractTablesWithRelations } from 'drizzle-orm/relations';
import { type PgTransaction } from 'drizzle-orm/pg-core';

export type Transaction = PgTransaction<
	NodePgQueryResultHKT,
	Record<string, never>,
	ExtractTablesWithRelations<Record<string, never>>
>;
