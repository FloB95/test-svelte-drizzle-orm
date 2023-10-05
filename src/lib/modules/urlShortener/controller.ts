import { db } from '$lib/db';
import { shortUrls, type NewShortUrl } from '$lib/db/schema/schema';
import { faker } from '@faker-js/faker';

export const addShortUrlAction = async (payload: NewShortUrl) => {
	const newUrl = {
		...payload,
		createdBy: faker.string.uuid(),
		code: faker.string.alphanumeric({
			length: 5
		})
	};
	await db.insert(shortUrls).values(newUrl);
};
