import { db } from '$lib/db';
import { deleteUrlSchema, insertUrlSchema, shortUrls } from '$lib/db/schema/schema';
import { logger } from '$lib/trpc/middleware/logger';
import { t } from '$lib/trpc/t';
import { asc, eq } from 'drizzle-orm';

export const urlShortener = t.router({
	getAll: t.procedure.use(logger).query(() => {
		return db.query.shortUrls.findMany({
			orderBy: [asc(shortUrls.createdAt)]
		});
	}), 

	add: t.procedure
		.use(logger)
		.input(insertUrlSchema)
		.mutation(async ({ input }) => {
			return db.insert(shortUrls).values(input);
		}),

	delete: t.procedure
		.use(logger)
		.input(deleteUrlSchema)
		.mutation(async ({ input }) => {
			return db.delete(shortUrls).where(eq(shortUrls.uid, input.uid));
		})
});
