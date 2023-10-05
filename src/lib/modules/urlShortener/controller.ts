import { db } from '$lib/db';
import { shortUrls, type NewShortUrl } from '$lib/db/schema/schema';
import { faker } from '@faker-js/faker';
import { TRPCError } from '@trpc/server';

export const addShortUrlAction = async (payload: NewShortUrl) => {
	const newUrl = {
		...payload,
		createdBy: faker.string.uuid(),
		code: faker.string.alphanumeric({
			length: 5
		})
	};

	try {
		await db.insert(shortUrls).values(newUrl);
	} catch (error: any) {
		throw new TRPCError({
			code: 'BAD_REQUEST',
			message: error.message
		});
	}
};
