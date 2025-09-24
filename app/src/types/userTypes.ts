import type { Static } from 'elysia';
import type { userSchema } from '../schemas/userSchema';

export type User = Static<typeof userSchema>;
