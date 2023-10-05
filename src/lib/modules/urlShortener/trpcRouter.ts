import { db } from '$lib/db';
import { deleteUrlSchema, insertUrlSchema, shortUrls } from '$lib/db/schema/schema';
import { createTRPCRouter, protectedProcedure, publicProcedure } from '$lib/trpc/trpc';
import { desc, eq } from 'drizzle-orm';
import { addShortUrlAction } from './controller';

export const urlShortener = createTRPCRouter({
	getAll: publicProcedure.query(() => {
		return db.query.shortUrls.findMany({
			orderBy: [desc(shortUrls.createdAt)]
		});
	}),

	add: protectedProcedure
		.input(insertUrlSchema)
		.mutation(async ({ input, ctx }) => {
      console.log(ctx);
			return await addShortUrlAction(input);
		}),

	delete: publicProcedure
		.input(deleteUrlSchema)
		.mutation(async ({ input }) => {
			return await db.delete(shortUrls).where(eq(shortUrls.uid, input.uid));
		})
});
